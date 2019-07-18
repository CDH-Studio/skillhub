import React, {useMemo} from "react";
import {useInput} from "utils/hooks";
import {Add, Search} from "@material-ui/icons";
import {ProjectCard} from "components/";
import {Project} from "utils/models";
import {Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import connect from "./connect";
import "./Projects.scss";

const Projects = ({
    sectionName, projects, unrelatedProjects, setDialogState,
    roleInputDialogOpen, searchDialogOpen, isUserProfile
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
            <AddProjectDialogs
                projects={projects}
                unrelatedProjects={unrelatedProjects}
                setDialogState={setDialogState}
                roleInputDialogOpen={roleInputDialogOpen}
                searchDialogOpen={searchDialogOpen}
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

const AddProjectDialogs = ({setDialogState, roleInputDialogOpen, searchDialogOpen, projects, unrelatedProjects}) => {
    const closeSearchDialog = () => {
        setDialogState("searchProject", false);
    };

    const openRoleInputDialog = () => {
        setDialogState("roleInput", true);
    };

    const closeRoleInputDialog = () => {
        setDialogState("roleInput", false);
    };
    return (
        <>
            <SearchDialog
                closeDialog={closeSearchDialog}
                dialogTitle={"Add Projects"}
                open={searchDialogOpen}
                projects={projects}
                unrelatedProjects={unrelatedProjects}
                openRoleInputDialog={openRoleInputDialog}
            />
            <RoleInputDialog
                closeDialog={closeRoleInputDialog}
                dialogTitle={"Input Project Role"}
                open={roleInputDialogOpen}
                closeSearchDialog={closeSearchDialog}
            />
        </>
    );
};

const SearchDialog = ({dialogTitle, closeDialog, open, openRoleInputDialog, unrelatedProjects}) => {
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
            {...project}
        />
    )), [searchedProjects, openRoleInputDialog]);

    return (
        <Dialog
            className="search-dialog"
            open={open}
            onClose={closeDialog}
            fullWidth={true}
            maxWidth="sm"
        >
            <div className="search-dialog-header">
                <DialogTitle className="dialog-title">
                    {dialogTitle}
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
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const RoleInputDialog = ({dialogTitle, closeDialog, open}) => {
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={closeDialog} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect(Projects);