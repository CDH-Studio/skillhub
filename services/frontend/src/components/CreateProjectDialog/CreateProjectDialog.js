import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField

} from "@material-ui/core";
import {Project} from "utils/models";
import "./CreateProjectDialog.scss";

const CreateProjectDialog = ({handleCancel, handleSubmit, open}) => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const onSubmitClick = () => {
        if (name.length !== 0 && description.length !== 0) {
            const project = new Project ({name: name.trim(), description:description.trim()});
            handleSubmit(project);
        }
    };

    const onNameChange = (event) => {
        const currentName = event.target.value.replace(/^\s+/g, "");
        setName(currentName);
    };

    const onDescriptionChange = (event) => {
        const currentDescription = event.target.value.replace(/^\s+/g, "");
        setDescription(currentDescription);
    };

    return (
        <Dialog className="create-project-dialog"
            open={open}
            onClose={handleCancel}
        >
            <DialogTitle className="create-project-dialog-title">
                Create Project
            </DialogTitle>
            <DialogContent className="create-project-dialog-content" dividers={true}>
                <TextField
                    className="input-field"
                    label="Enter Name"
                    onChange={onNameChange}
                    value={name}
                />
                <TextField
                    className="input-field"
                    label="Enter Description"
                    multiline={true}
                    onChange={onDescriptionChange}
                    rowsMax="4"
                    value={description}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmitClick} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProjectDialog;