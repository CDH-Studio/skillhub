import React from "react";
import Scrollspy from "react-scrollspy";
import {Avatar} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Email from "@material-ui/icons/Email";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Icon from '@material-ui/core/Icon';
import "./Profile.scss";

const ProfileLayout = () => {
    return (
        <div className="scrollable-container">
            <div className="profile">
                <ProfileSidebar />
                <ProfileContent />
            </div> 
        </div>
    );
};

const ProfileSidebar = () => (
    <div className="profile-sidebar" item={true} xs={4}>
        <Scrollspy
            className="profile-scroll-nav"
            rootEl=".profile-content"
            items={["profile-personal-details", "profile-skills", "profile-projects"]}
            currentClassName="is-current"
        >
            <li className="profile-list-item">
                <a href="#profile-personal-details">Personal Details</a>
            </li>
            <li className="profile-list-item">
                <a href="#profile-skills">Skills</a>
            </li>
            <li className="profile-list-item">
                <a href="#profile-projects">Projects</a>
            </li>
        </Scrollspy>
    </div>
);

const ProfileContent = () => (
    <div className="profile-content" item={true} xs={8}>
        <section id="profile-personal-details">
            <Paper className="profile-card">
                <Avatar className="profile-picture">
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
                        <p>
                            <Email />
                            Devin.Sit@Canada.ca
                        </p>

                        <p>
                            <LocalPhone />
                            123-456-7890
                        </p>
                    </div>
                </div>
            </Paper>
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

export default ProfileLayout;