import React, {useCallback, useState, useMemo} from "react";
import {useInput} from "utils/hooks";
import {Add, Search} from "@material-ui/icons";
import {ProjectCard} from "components/";
import {Project, ProjectProfile} from "utils/models";
import {Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import connect from "./connect";
import "./Projects.scss";

const Projects = ({
    sectionName, projects, unrelatedProjects, setDialogState,
    roleInputDialogOpen, searchDialogOpen, isUserProfile, onSubmit, profile
}) => {
    const openSearchDialog = () => {
        setDialogState("searchProject", true);
    };

    const projectCards = useMemo(() => projects.map((project) => (
        <ProjectCard
            className="profile-project-card"
            key={project.id}
            isActive={Project.isActive(project)}
            showMoreSkills={true}
            {...project}
        />
    )), [projects]);

    return (
        <>
            <SearchDialog
                unrelatedProjects={unrelatedProjects}
                setDialogState={setDialogState}
                roleInputDialogOpen={roleInputDialogOpen}
                searchDialogOpen={searchDialogOpen}
                onSubmit={onSubmit}
                profile={profile}
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
            <div className="profile-page-card profile-card-projects">
                {projectCards}
            </div>
        </>
    );
};

const SearchDialog = ({
    setDialogState, roleInputDialogOpen, searchDialogOpen,
    unrelatedProjects, onSubmit, profile
}) => {
    //Create 'projectProfile' state to hold data on our projectProfile to add.
    const [currentProject, setCurrentProject] = useState(null);

    //create all your state setting functions
    const openRoleInputDialog = useCallback(() => {
        setDialogState("roleInput", true);
    }, [setDialogState]);

    const closeSearchDialog = () => {
        setDialogState("searchProject", false);
    };

    const closeRoleInputDialog = () => {
        setDialogState("roleInput", false);
    };

    //Create a controlled search field to be used to filter projects
    const searchInput = useInput();
    const {value: searchTerm} = searchInput;

    const searchedProjects = useMemo(() => (
        Project.searchProjects(unrelatedProjects, searchTerm)
    ), [unrelatedProjects, searchTerm]);

    const projectCards = useMemo(() => searchedProjects.map((project) => (
        <ProjectCard
            className="add-projects-dialog-card"
            key={project.id}
            isActive={Project.isActive(project)}
            openRoleInputDialog={openRoleInputDialog}
            setCurrentProject={() => setCurrentProject(project)}
            {...project}
        />
    )), [searchedProjects, openRoleInputDialog, setCurrentProject]);

    return (
        <>
            <RoleInputDialog
                closeDialog={closeRoleInputDialog}
                dialogTitle={"Input Project Role"}
                open={roleInputDialogOpen}
                onSubmit={onSubmit}
                currentProject={currentProject}
                profile={profile}
                unrelatedProjects={unrelatedProjects}
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

const RoleInputDialog = ({dialogTitle, closeDialog, open, currentProject, profile, onSubmit}) => {

    const roleInput = useInput();
    const {value: role} = roleInput;

    if (currentProject) {
        currentProject.role = role;
        currentProject.profile = profile;
    }

    const onSubmitClick = useCallback(() => onSubmit(
        currentProject
    ), [
        currentProject, onSubmit
    ]);

    return (
        <Dialog
            className="role-input-dialog"
            open={open}
            onClose={closeDialog}
            fullWidth={true}
            maxWidth="xs"
        >
            <div className="role-input-dialog-header">
                <DialogTitle className="project-dialog-title">
                    {dialogTitle}
                </DialogTitle>
            </div>
            <DialogContent
                className="role-input-dialog-content"
                dividers={true}
            >
                <TextField
                    className="role-input-dialog-field"
                    margin="dense"
                    id="role"
                    label="Role"
                    autoFocus={true}
                    {...roleInput}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmitClick} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect(Projects);