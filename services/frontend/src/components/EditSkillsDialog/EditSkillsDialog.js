import React from "react";
import Downshift from "downshift";
import {Profile, Project} from "utils/models";

import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import "./EditSkillsDialog.scss";
import classNames from "classnames";

const EditSkillsDialog = ({databaseSkills, skills, handleCancel, handleSubmit, open}) => {
    //Sort the Database skills and
    const sortedSkills = Object.values(databaseSkills).sort((a, b) => a.name.localeCompare(b.name));
    const suggestions = sortedSkills.map((skill) => {
        return {id: skill.id, value: skill.name};
    });

    const [skillsUpdated, setSkills] = React.useState(JSON.parse(JSON.stringify(skills)));

    console.log("skillsupdated", skillsUpdated);

    const onDeleteChip = (skillToDelete) => () => {
        setSkills(skillsUpdated.filter((skill) => skill.id !== skillToDelete.id));
        console.log(skillsUpdated);
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
            const newSkill = event.target.value.trim();
            const newSkillObject = Profile.addSkill(newSkill, skillsUpdated, databaseSkills);
            if (newSkillObject) {
                console.log("before", skillsUpdated);
                setSkills([...skillsUpdated, newSkillObject]);
                console.log("after", skillsUpdated);
            }

            event.target.value = "";
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
                <div>
                    <TextField
                        className="edit-skills-dialog-text"
                        onKeyPress={onPressEnter}
                        placeholder="Enter Skill"
                    />
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