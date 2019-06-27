import {IconButton, Paper} from "@material-ui/core";
import {ChevronRight, Email, LocalPhone} from "@material-ui/icons";
import React from "react";
import {AvatarIcon, SkillBadges} from "components/";
import "./ProfileCard.scss";
import {Link} from "react-router-dom";

const DISPLAY_SKILL_COUNT = 3;

const ProfileCard = ({id, name, primaryRole, contactEmail, phone, skills}) => {
    // Only show the first DISPLAY_SKILL_COUNT skills, so as to not crowd the card too much
    return (
        <Paper className="people-profile-card">
            <AvatarIcon
                name={name}
                personsRole=""
                className="avatar-icon"
            />

            <div className="people-profile-card-details-section">
                <h2 className="people-profile-card-title">
                    {name}
                </h2>

                <h3 className="people-profile-card-subtitle">
                    {primaryRole}
                </h3>

                <div className="people-profile-card-contact">
                    <p className="people-profile-card-text">
                        <Email />
                        {contactEmail}
                    </p>

                    <p className="people-profile-card-text">
                        <LocalPhone />
                        {phone}
                    </p>
                </div>
            </div>
            <div className="people-profile-card-skills-section">
                <div className="people-profile-card-skills-content">
                    <SkillBadges
                        skills={skills}
                        displayCount={DISPLAY_SKILL_COUNT}
                    />
                </div>
            </div>
            <div className="people-profile-card-nav-section">
                <Link to={`/app/people/${id}`} >
                    <IconButton className="people-profile-card-nav">
                        <ChevronRight />
                    </IconButton>
                </Link>
            </div>
        </Paper>
    );
};

export default ProfileCard;