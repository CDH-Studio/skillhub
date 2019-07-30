import React from "react";
import ChipInput from "material-ui-chip-input";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Chip from '@material-ui/core/Chip';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import "./EditSkillsDialog.scss";

const EditSkillsDialog = ({databaseSkills, skills, handleCancel, handleSubmit, open}) => {
    const sortedSkills = Object.values(databaseSkills).sort((a, b) => a.name.localeCompare(b.name));
    //skills.push(...skills);
    const [skillsUpdated, setSkills] = React.useState(skills);
    console.log(skillsUpdated);

    // const handleChange = (chips) => {
    //     currentChips = chips;
    // };
    const onDeleteChip = (skillToDelete) => () => {
        setSkills(skillsUpdated.filter((skill) => skill.id !== skillToDelete.id));
        console.log(skillsUpdated);
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
                <div className="chipArray">
                    {skillsUpdated.map((skill) =>
                        <Chip
                            className="chipArraySkill"
                            key={skill.id}
                            label={skill.name}
                            onDelete={onDeleteChip(skill)}
                        />)}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleSubmit(skillsUpdated)} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSkillsDialog;