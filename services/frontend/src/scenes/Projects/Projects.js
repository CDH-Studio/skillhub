import React from "react";
import ProjectsLayout from "./ProjectsLayout";

class Projects extends React.Component {
    state = {
        activeFilter: "all"  // "all", "recentlyActive", "inactive"
    };

    onFilterClick = (filter) => () => {
        this.setState({activeFilter: filter});
    };

    render() {
        const {activeFilter} = this.state;

        return (
            <ProjectsLayout
                activeFilter={activeFilter}
                onFilterClick={this.onFilterClick}
            />
        );
    }
}

export default Projects;
