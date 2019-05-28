import React from "react";
import Scrollspy from "react-scrollspy";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./Profile.scss";

const ProfileLayout = () => {
    return (
        <Grid className="profile container">
            <ProfileSidebar />
            <ProfileContent />
        </Grid>
    );
};

const ProfileSidebar = () => (
    <Grid className="profile-sidebar" item={true} xs={4}>
        <Scrollspy
            className="profile-scroll-nav"
            rootEl=".profile-content"
            items={["personal-details", "skills", "projects"]}
            currentClassName="is-current"
        >
            <li className="profile-list-item">
                <a href="#personal-details">Personal Details</a>
            </li>
            <li className="profile-list-item">
                <a href="#skills">Skills</a>
            </li>
            <li className="profile-list-item">
                <a href="#projects">Projects</a>
            </li>
        </Scrollspy>
    </Grid>
);

const ProfileContent = () => (
    <Grid className="profile-content" item={true} xs={8}>
        <section id="personal-details">
            <Paper className="profile-content-card">
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
        <section id="skills">
            <h2>Skills</h2>
            <Paper className="profile-content-card">
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
        <section id="projects">
            <h2>Projects</h2>
            <Paper className="profile-content-card">
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
    </Grid>
);

export default ProfileLayout;