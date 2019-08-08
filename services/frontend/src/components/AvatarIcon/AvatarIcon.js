import React from "react";
import {Avatar, Tooltip} from "@material-ui/core";
import "./AvatarIcon.scss";

const AvatarIcon = ({name, personsRole, className}) => (
    <div className="avatar-icon-content">
        <Tooltip title={personsRole ? personsRole : ""} placement="top" disableHoverListener={!personsRole}>
            <Avatar className={className}>
                {generateAvatarInitials(name)}
            </Avatar>
        </Tooltip>
    </div>
);

//Split at each word, take the first and last words and then grab their first letters.
const generateAvatarInitials = (name) => {
    const initials = name.trim().split(" ");
    initials.splice(1, initials.length - 2);

    return initials.reduce((acc, word) => (
        acc + word[0]
    ), []).toUpperCase();
};

export default AvatarIcon;
