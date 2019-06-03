import React from "react";
import {ScrollContainer, Sidebar} from "components/";
import {Avatar, Paper} from "@material-ui/core";
import {Email, LocalPhone} from "@material-ui/icons";
import "./Profile.scss";

const ProfileLayout = (props) => {
    return (
        <ScrollContainer>
            <Sidebar
                sections={props.sections}
                containerClass={props.containerClass}
            />
            <ProfileContent />
        </ScrollContainer>
    );
};

const ProfileContent = () => (
    <div className="profile-content">
        <section id="profile-personal-details">
            <ProfileDetails />
        </section>

        <section id="profile-skills">
            <h2>Skills</h2>
            <Paper className="profile-card">
                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

                <br /><br />

                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.
            </Paper>
        </section>

        <section id="profile-projects">
            <h2>Projects</h2>
            <Paper className="profile-card">
                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

                <br /><br />

                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

                Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
                sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
                rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
                eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
                cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
                i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.
            </Paper>
        </section>
    </div>
);

const ProfileDetails = () => (
    <Paper className="profile-card">
        <Avatar className="profile-card-picture">
            DS
        </Avatar>

        <div className="profile-card-content">
            <h2 className="profile-card-title">
                Devin Sit
            </h2>

            <h3 className="profile-card-subtitle">
                Software Developer
            </h3>

            <div className="profile-card-contact">
                <p className="profile-card-text">
                    <Email />
                    Devin.Sit@Canada.ca
                </p>

                <p className="profile-card-text">
                    <LocalPhone />
                    123-456-7890
                </p>
            </div>
        </div>
    </Paper>
);

export default ProfileLayout;