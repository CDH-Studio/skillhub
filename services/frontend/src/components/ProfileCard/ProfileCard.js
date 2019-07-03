import {IconButton} from "@material-ui/core";
import {ChevronRight, Email, LocalPhone} from "@material-ui/icons";
import React from "react";
import {AvatarIcon, SkillBadges} from "components/";
import "./ProfileCard.scss";
import {Link} from "react-router-dom";
import classNames from "classnames";

const DISPLAY_SKILL_COUNT = 4;

const ProfileCard = ({id, page, name, primaryRole, contactEmail, phone, skills}) => {
    // Only show the first DISPLAY_SKILL_COUNT skills, so as to not crowd the card too much
    return (
        <div className="profile-card">
            <AvatarIcon
                name={name}
                personsRole=""
                className="avatar-icon"
            />

            <div className="profile-card-details-section">
                <h2 className="profile-card-title">
                    {name}
                </h2>

                <h3 className="profile-card-subtitle">
                    {primaryRole}
                </h3>

                <div className="profile-card-contact">
                    <p className="profile-card-text">
                        <Email />
                        {contactEmail}
                    </p>

                    <p className="profile-card-text">
                        <LocalPhone />
                        {phone}
                    </p>
                </div>
            </div>
            <div
                className={classNames(
                    "profile-card-extras",
                    {"profile-card-extras--people": (page === "people")}
                )}
            >
                <div className="profile-card-extras-skills-section">
                    <div className="profile-card-extras-skills-content">
                        <SkillBadges
                            skills={skills}
                            displayCount={DISPLAY_SKILL_COUNT}
                        />
                    </div>
                </div>
                <div className="profile-card-extras-nav-section">
                    <Link to={`/app/people/${id}`}>
                        <IconButton className="profile-card-extras-nav">
                            <ChevronRight />
                        </IconButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;