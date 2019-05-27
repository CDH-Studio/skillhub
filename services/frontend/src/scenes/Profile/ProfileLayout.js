import React from "react";
import "./Profile.scss";
import Scrollspy from 'react-scrollspy'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const ProfileLayout = () => {
    return (
        <Grid className="profile container">
            <ProfileSidebar/>
            <ProfileContent/>
        </Grid>
    );
};

const ProfileSidebar = () => (
    <Grid className="profile-sidebar" item xs={4}>
        <Scrollspy className="profile-scroll-nav" rootEl=".profile-content" items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current"> 
            <li><a href="#section-1">section 1</a></li> 
            <li><a href="#section-2">section 2</a></li>
            <li><a href="#section-3">section 3</a></li>
        </Scrollspy> 
    </Grid>
);

const ProfileContent = () => (
        <Grid className="profile-content" item xs={8}>
            <div> 
                <section id="section-1">
                    <Paper>
                        Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia consequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehenderit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit excepteur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occaecat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nisi id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

Cillum sit veniam pariatur cupidatat. Occaecat labore eu cillum cupidatat et aute mollit tempor adipisicing laboris excepteur labore. Adipisicing ut esse amet consequat commodo ullamco deserunt cillum excepteur. Cupidatat ex quis cillum duis occaecat adipisicing dolore occaecat nisi pariatur. Sit Lorem incididunt exercitation reprehenderit ullamco irure exercitation aliqua anim et ad reprehenderit qui aute. Incididunt velit excepteur adipisicing fugiat et eiusmod nisi. Consequat sunt ut voluptate laborum officia consequat ut commodo ut.

Cupidatat tempor ea reprehenderit esse anim laboris aliquip adipisicing fugiat ipsum ipsum eiusmod. Elit sunt adipisicing ut sunt sunt adipisicing. Excepteur sint deserunt excepteur nisi eu. Et amet consectetur cillum id. Dolore cillum eiusmod dolore dolor voluptate consequat voluptate.

Eu laboris voluptate ullamco sunt sit non quis deserunt. Est fugiat esse veniam qui duis adipisicing irure ad elit Lorem. Amet commodo sint aute eiusmod deserunt excepteur ea dolor cillum veniam exercitation consequat.

Ad duis commodo labore sunt pariatur ex do. Veniam tempor tempor nulla qui eu amet tempor esse nostrud quis aliquip nisi. Veniam voluptate qui dolore tempor nisi anim anim exercitation id excepteur. Ea voluptate reprehenderit proident sint fugiat pariatur sint esse aliquip sit laborum. Mollit occaecat fugiat amet qui exercitation consequat mollit irure amet mollit.
                    </Paper>
                </section> 
                <section id="section-2">
                    <h2>Skills</h2>
                    <Paper>
                        Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia consequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehenderit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit excepteur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occaecat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nisi id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

Cillum sit veniam pariatur cupidatat. Occaecat labore eu cillum cupidatat et aute mollit tempor adipisicing laboris excepteur labore. Adipisicing ut esse amet consequat commodo ullamco deserunt cillum excepteur. Cupidatat ex quis cillum duis occaecat adipisicing dolore occaecat nisi pariatur. Sit Lorem incididunt exercitation reprehenderit ullamco irure exercitation aliqua anim et ad reprehenderit qui aute. Incididunt velit excepteur adipisicing fugiat et eiusmod nisi. Consequat sunt ut voluptate laborum officia consequat ut commodo ut.

Cupidatat tempor ea reprehenderit esse anim laboris aliquip adipisicing fugiat ipsum ipsum eiusmod. Elit sunt adipisicing ut sunt sunt adipisicing. Excepteur sint deserunt excepteur nisi eu. Et amet consectetur cillum id. Dolore cillum eiusmod dolore dolor voluptate consequat voluptate.

Eu laboris voluptate ullamco sunt sit non quis deserunt. Est fugiat esse veniam qui duis adipisicing irure ad elit Lorem. Amet commodo sint aute eiusmod deserunt excepteur ea dolor cillum veniam exercitation consequat.

Ad duis commodo labore sunt pariatur ex do. Veniam tempor tempor nulla qui eu amet tempor esse nostrud quis aliquip nisi. Veniam voluptate qui dolore tempor nisi anim anim exercitation id excepteur. Ea voluptate reprehenderit proident sint fugiat pariatur sint esse aliquip sit laborum. Mollit occaecat fugiat amet qui exercitation consequat mollit irure amet mollit.
                    </Paper>
                </section> 
                <section id="section-3">
                    <h2>Projects</h2>
                    <Paper>
                        Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia consequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehenderit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit excepteur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occaecat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nisi id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

Cillum sit veniam pariatur cupidatat. Occaecat labore eu cillum cupidatat et aute mollit tempor adipisicing laboris excepteur labore. Adipisicing ut esse amet consequat commodo ullamco deserunt cillum excepteur. Cupidatat ex quis cillum duis occaecat adipisicing dolore occaecat nisi pariatur. Sit Lorem incididunt exercitation reprehenderit ullamco irure exercitation aliqua anim et ad reprehenderit qui aute. Incididunt velit excepteur adipisicing fugiat et eiusmod nisi. Consequat sunt ut voluptate laborum officia consequat ut commodo ut.

Cupidatat tempor ea reprehenderit esse anim laboris aliquip adipisicing fugiat ipsum ipsum eiusmod. Elit sunt adipisicing ut sunt sunt adipisicing. Excepteur sint deserunt excepteur nisi eu. Et amet consectetur cillum id. Dolore cillum eiusmod dolore dolor voluptate consequat voluptate.

Eu laboris voluptate ullamco sunt sit non quis deserunt. Est fugiat esse veniam qui duis adipisicing irure ad elit Lorem. Amet commodo sint aute eiusmod deserunt excepteur ea dolor cillum veniam exercitation consequat.

Ad duis commodo labore sunt pariatur ex do. Veniam tempor tempor nulla qui eu amet tempor esse nostrud quis aliquip nisi. Veniam voluptate qui dolore tempor nisi anim anim exercitation id excepteur. Ea voluptate reprehenderit proident sint fugiat pariatur sint esse aliquip sit laborum. Mollit occaecat fugiat amet qui exercitation consequat mollit irure amet mollit.
                    </Paper>
                </section> 
            </div> 
        </Grid>
);

export default ProfileLayout;
