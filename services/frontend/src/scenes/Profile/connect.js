import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {skillsSlice} from "store/slices";
import {reduceLoadingStates} from "utils/helperFunctions";
import {profilesRequestsSlice, projectsRequestsSlice, skillsRequestsSlice} from "store/slices";
import ScreenUrls from "utils/screenUrls";

const mapStateToProps = (state) => {
    const mappedState = {};
    mappedState.isLoading = reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state);

    if (crossSliceSelectors.isMatchingRoute(ScreenUrls.PROFILE)(state)) {
        mappedState.projects = crossSliceSelectors.getProjectsForUser(state);
        mappedState.profile = crossSliceSelectors.getUserProfile(state);
        mappedState.skills = skillsSlice.selectors.getSkills(state);

    } else {
        const loadedProfile = crossSliceSelectors.getProfileFromUrlId(state);

        if (loadedProfile) {
            mappedState.profile = loadedProfile;
            mappedState.projects = crossSliceSelectors.getProjectsFromProfileUrlId(state);
            mappedState.skills = skillsSlice.selectors.getSkills(state);
        } else {
            mappedState.profile = {};
            mappedState.projects = [];
            mappedState.skills = {};
        }
    }
    return mappedState;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle) => dispatch(
            profilesRequestsSlice.patchPersonalDetails.actions.request({
                id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
            })
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps);
