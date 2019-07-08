import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {skillsSlice} from "store/slices";
import {reduceLoadingStates} from "utils/helperFunctions";
import {
    profilesRequestsSlice,
    projectsRequestsSlice,
    skillsRequestsSlice
} from "store/slices";
import ScreenUrls from "utils/screenUrls";

const mapStateToProps = (state) => {
    const mappedState = {};
    const personalDetailsRequest = {};
    const isUserProfile = crossSliceSelectors.isMatchingRoute(ScreenUrls.PROFILE)(state);

    mappedState.isUserProfile = isUserProfile;

    /* Determine if any parts of the page are still loading */
    mappedState.isLoading = reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state);

    /* Map required data for the personal details request */
    personalDetailsRequest.isLoading = profilesRequestsSlice.patchPersonalDetails.selectors.getLoading(state);
    personalDetailsRequest.error = profilesRequestsSlice.patchPersonalDetails.selectors.getError(state);
    mappedState.personalDetailsRequest = personalDetailsRequest;

    if (isUserProfile) {
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
        submitPersonalDetails: (id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle) => dispatch(
            profilesRequestsSlice.patchPersonalDetails.actions.request({
                id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
            })
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps);
