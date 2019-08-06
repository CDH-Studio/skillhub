import React, {useCallback, useState, useMemo} from "react";
import {useInput} from "utils/hooks";
import {Add, Search} from "@material-ui/icons";
import {ProjectCard, RoleInputDialog} from "components/";
import {Project} from "utils/models";
import {Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import connect from "./connect";
import "./Projects.scss";

const Projects = ({
    clearCreateError, error, isUserProfile, onSubmit, profile, projects, roleInputDialogOpen,
    searchDialogOpen, sectionName, setDialogState, unrelatedProjects
}) => {
    const openSearchDialog = () => {
        setDialogState("searchProject", true);
    };

    const projectCards = useMemo(() => projects.reduce((acc, project) => {
        const projectActive = Project.isActive(project);

        if (projectActive) {
            return [
                ...acc,
                <ProjectCard
                    className="profile-project-card"
                    key={project.id}
                    isActive={projectActive}
                    showMoreSkills={true}
                    {...project}
                />
            ];
        }
        return acc;
    }, []), [projects]);

    return (
        <>
            <SearchDialog
                clearCreateError={clearCreateError}
                error={error}
                onSubmit={onSubmit}
                profile={profile}
                roleInputDialogOpen={roleInputDialogOpen}
                searchDialogOpen={searchDialogOpen}
                setDialogState={setDialogState}
                unrelatedProjects={unrelatedProjects}
            />
            <div className="profile-card-projects-header-section">
                <h2>{sectionName}</h2>
                {isUserProfile &&
                    <IconButton
                        className="profile-card-edit-projects-button"
                        onClick={openSearchDialog}
                        color="primary"
                    >
                        <Add />
                    </IconButton>
                }
            </div>
            <div className="profile-card-projects">
                {projectCards}
            </div>
        </>
    );
};

const SearchDialog = ({
    clearCreateError, error, onSubmit, profile, roleInputDialogOpen,
    searchDialogOpen, setDialogState, unrelatedProjects
}) => {
    // Create 'currentProject' state to hold the profile to create an association for.
    const [currentProject, setCurrentProject] = useState(null);

    // create all your state setting functions
    const openRoleInputDialog = useCallback(() => {
        setDialogState("roleInput", true);
    }, [setDialogState]);

    const closeSearchDialog = () => {
        setDialogState("searchProject", false);
    };

    const closeRoleInputDialog = () => {
        setDialogState("roleInput", false);
        clearCreateError();
    };

    // Create a controlled search field to be used to filter projects
    const searchInput = useInput();
    const {value: searchTerm} = searchInput;

    /* Generate a list of projects that match the searchTerm and are not currently
     * on the profile */
    const searchedProjects = useMemo(() => (
        Project.searchProjects(unrelatedProjects, searchTerm)
    ), [unrelatedProjects, searchTerm]);

    const projectCards = useMemo(() => searchedProjects.map((project) => (
        <ProjectCard
            className="add-projects-dialog-card"
            key={project.id}
            isActive={Project.isActive(project)}
            isSearchCard={true}
            openRoleInputDialog={openRoleInputDialog}
            setCurrentProject={() => setCurrentProject(project)}
            {...project}
        />
    )), [searchedProjects, openRoleInputDialog, setCurrentProject]);

    return (
        <>
            <RoleInputDialog
                closeDialog={closeRoleInputDialog}
                currentProject={currentProject}
                dialogTitle="Input Project Role"
                error={error}
                key={roleInputDialogOpen}
                open={roleInputDialogOpen}
                onSubmit={onSubmit}
                profile={profile}
            />
            <Dialog
                className="search-dialog"
                open={searchDialogOpen}
                onClose={closeSearchDialog}
                fullWidth={true}
                maxWidth="sm"
            >
                <div className="search-dialog-header">
                    <DialogTitle className="dialog-title">
                        Add Projects
                    </DialogTitle>
                    <div className="search-dialog-search">
                        <TextField
                            placeholder="Search…"
                            margin="dense"
                            InputProps={{
                                endAdornment: (
                                    <Search color="action" />
                                )
                            }}
                            {...searchInput}
                        />
                    </div>
                </div>
                <DialogContent
                    className="search-dialog-content"
                    dividers={true}
                >
                    {projectCards}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeSearchDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default connect(Projects);