import React from "react";
import {Profile} from "utils/models";

import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./EditSkillsDialog.scss";
import classNames from "classnames";

const EditSkillsDialog = ({databaseSkills, skills, handleCancel, handleSubmit, open}) => {
    //Sort the Database skills and
    const sortedSkills = Object.values(databaseSkills).sort((a, b) => a.name.localeCompare(b.name));

    const [skillsUpdated, setSkills] = React.useState(JSON.parse(JSON.stringify(skills)));
    const [suggestionsUpdated, setSuggestions] = React.useState([]);
    const [textfield, setTextfield] = React.useState("");

    const addSkillToChipArray = (skill) => {
        const newSkillObject = Profile.addSkill(skill, skillsUpdated, databaseSkills);
        if (newSkillObject) {
            setSkills([...skillsUpdated, newSkillObject]);
        }
        setTextfield("");
    };

    const onAddClick = () => {
        addSkillToChipArray(textfield);
    };

    const onChangeTextfield = (event) => {
        const searchTerm = event.target.value.trim();
        const searchTermLength = searchTerm.length;
        let newSuggestions = [];
        if (searchTermLength > 0){
            newSuggestions = getSuggestions(searchTerm);
        }
        setSuggestions([...newSuggestions]);
        setTextfield(searchTerm);
    };

    const onClickSuggestion = (value) => {
        setTextfield(value);
        setSuggestions([]);
    };

    const getSuggestions = (searchTerm) => {
        const currentSuggestions = sortedSkills.filter((skill) =>
            skill.name.substring(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase()
        );
        return currentSuggestions;
    };

    const onDeleteChip = (skillToDelete) => () => {
        setSkills(skillsUpdated.filter((skill) => skill.id !== skillToDelete.id));
    };

    const onClickChip = (skillToUpdate) => () => {
        setSkills(skillsUpdated.map((skill) => {
            if (skill.id === skillToUpdate.id)
                skill.isHighlySkilled = !skill.isHighlySkilled;

            return skill;
        }));
    };

    const onPressEnter = (event) => {
        if (event.key === "Enter") {
            addSkillToChipArray(event.target.value.trim());
        }
    };

    return (
        <Dialog className="edit-skills-dialog"
            aria-labelledby="edit-skills-title"
            open={open}
            onClose={handleCancel}
        >
            <DialogTitle id="edit-skills-dialog-title">
                Edit Skills
            </DialogTitle>
            <DialogContent>
                <div className="chip-array">
                    {skillsUpdated.map((skill) =>
                        <Chip
                            className={classNames(
                                "chip-array-skill",
                                {"chip-array-skill--skilled": skill.isHighlySkilled}
                            )}
                            key={skill.id}
                            label={skill.name}
                            onClick={onClickChip(skill)}
                            onDelete={onDeleteChip(skill)}
                        />)}
                </div>
                <div className="edit-skills-dialog-text">
                    <TextField
                        className="edit-skills-dialog-text-field"
                        onChange={onChangeTextfield}
                        onKeyPress={onPressEnter}
                        value={textfield}
                        placeholder="Enter Skill"
                    />
                    <IconButton className="edit-skills-dialog-add-icon" onClick={onAddClick}>
                        <AddIcon />
                    </IconButton>
                </div>
                <div className="suggestion-dropdown">
                    {
                        suggestionsUpdated.map((suggestion) =>
                            <Button
                                className="suggestion"
                                key={suggestion.id}
                                onClick={() => onClickSuggestion(suggestion.name)}
                                variant="outlined"
                            >
                                {suggestion.name}
                            </Button>
                        )
                    }
                </div>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit(skillsUpdated)} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default EditSkillsDialog;