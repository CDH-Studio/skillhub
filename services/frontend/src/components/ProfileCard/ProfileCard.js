import {IconButton} from "@material-ui/core";
import {Create, ChevronRight, Email, LocalPhone} from "@material-ui/icons";
import React from "react";
import {AvatarIcon, SkillBadges} from "components/";
import "./ProfileCard.scss";
import {Link} from "react-router-dom";
import {SlackIcon, RocketChatIcon} from "assets/icons";
import classNames from "classnames";

const DISPLAY_SKILL_COUNT = 4;

const ProfileCard = ({
    id, page, openDialog, skills,
    name, primaryRole, contactEmail, phone, slackHandle, rocketChatHandle
}) => {
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
                    <ProfileDetail
                        icon={<Email />}
                        data={contactEmail}
                    />
                    <ProfileDetail
                        icon={<LocalPhone />}
                        data={phone}
                    />
                    <ProfileDetail
                        icon={
                            <SlackIcon />
                        }
                        data={slackHandle}
                    />
                    <ProfileDetail
                        icon={
                            <RocketChatIcon />
                        }
                        data={rocketChatHandle}
                    />
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
            <div
                className={classNames(
                    "profile-card-extras",
                    {"profile-card-extras--profile": (page === "userProfile")}
                )}
            >
                <div className="profile-card-extras-edit">
                    <IconButton
                        className="profile-card-extras-edit-button"
                        onClick={openDialog}
                        color="primary"
                    >
                        <Create />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

const ProfileDetail = ({icon, data}) => (
    (data) ? (
        <p className="profile-card-text">
            {icon}
            {data}
        </p>
    ) : (
        null
    )
);

export default ProfileCard;