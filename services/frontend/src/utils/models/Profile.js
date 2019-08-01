import uuidv4 from "uuid/v4";
import {arrayToObject} from "utils/helperFunctions";
import {ProfileSkill, Skill} from "utils/models";

export default class Profile {
    constructor({
        id = uuidv4(),
        name = "",
        primaryRole = "",
        contactEmail = "",
        phone = "",
        slackHandle = "",
        rocketChatHandle = "",
        userId = uuidv4(),
        createdAt = new Date(),
        updatedAt = new Date(),
        profileSkills = []
    } = {}) {
        this.id = id;
        this.name = name;
        this.primaryRole = primaryRole;
        this.contactEmail = contactEmail;
        this.phone = phone;
        this.slackHandle = slackHandle;
        this.rocketChatHandle = rocketChatHandle;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        // Temporary related properties; might exist from API results, but aren't used past initial processing
        this.profileSkills = profileSkills;
    }

    static get FILTER_ALL() {return "all";}

    /* Normalize a single profile to {ID -> Profile} */
    static normalizeProfile = (profile) => {
        const processedProfile = new Profile(profile);

        if (processedProfile.profileSkills) {
            processedProfile.profileSkills = processedProfile.profileSkills.map(({id}) => id);
        } else {
            processedProfile.profileSkills = [];
        }

        return processedProfile;
    };

    /* Normalizes the list of profiles that the API returns into a map of {ID -> Profile},
     * with the skills processed to just their IDs, for appropriate use in the Redux store. */
    static normalizeApiResultsForRedux(profiles) {
        return profiles.reduce(arrayToObject({processor: this.normalizeProfile}), {});
    }

    static extractProfileSkills(profiles = []) {
        return profiles.reduce((acc, profile) => [...acc, ...profile.profileSkills], []);
    }

    static filterProfiles(profiles, filter = Profile.FILTER_ALL) {
        if (filter === Profile.FILTER_ALL) {
            return profiles;
        } else {
            return profiles;
        }
    }

    /* Iterate over profiles checking for the current user's id, then return that user's entire profile. */
    static getUserProfile(profilesById, userId) {
        if (!profilesById || !userId) return null;

        const foundProfileIndex = Object.keys(profilesById).filter((profileId) => (
            profilesById[profileId].userId === userId
        )).join();

        return foundProfileIndex ? profilesById[foundProfileIndex] : null;
    }

    /* Takes profiles, profileSkills, profileskillsByProfileId's and Skills.
    grabs all of the profileSkills objects from a profile and merges them with the skills objects */
    static mergeProfilesWithSkills(
        profilesById = {}, profileSkillsById = {}, profileSkillsByProfileId = {}, skillsById = {}
    ) {
        const profilesWithSkills = Object.keys(profilesById).map((profileId) => {
            /* get the profileSkills for a given profile */
            const profile = {...profilesById[profileId]};
            const profileSkills = ProfileSkill.mapProfileIdToProfileSkills(
                profileId, profileSkillsById, profileSkillsByProfileId
            );

            /* Merge the profileSkills and the Skills */
            profile.skills = profileSkills.reduce((acc, profileSkill) => {
                if (profileSkill && profileSkill.skillId in skillsById) {
                    const skill = new Skill({...skillsById[profileSkill.skillId]});
                    skill.isHighlySkilled = profileSkill.isHighlySkilled;
                    acc = [...acc, skill];
                }
                return acc;
            }, []);

            /* Delete the unneeded profileSkills and return profile */
            delete profile.profileSkills;
            return profile;
        });

        return profilesWithSkills;
    }

    static addSkill = (newSkillName, updatedSkills, databaseSkills) => {
        const currentSkillsLC = updatedSkills.map((skill) => skill.name.toLowerCase());

        //Checks if the skill already has been added
        if (currentSkillsLC.filter((skill) => skill === newSkillName.toLowerCase()).length){
            return;
        }

        /* Adds skill from database */
        if (newSkillName.length > 0) {
            for (const skill of Object.values(databaseSkills)) {
                const skillNameLC = skill.name.toLowerCase();
                if (skillNameLC === newSkillName.toLowerCase())
                    return skill;
            }
        }
        /* Adds new Skill */
        if (newSkillName.length > 0) {
            return new Skill({name: newSkillName});
        }
    };

    static removeSkills = (profile, updatedSkills) => {
        profile.skills = profile.skills.filter((skill) => updatedSkills.includes(skill.name));
        return profile;
    };
}

const removeDuplicate = (arr) => {
    const arrUnique = arr.reduce((acc, value) => {
        if (!acc.includes(value.toLowerCase())) {
            return [...acc, value.toLowerCase()];
        }
        return acc;
    }, []);

    return arrUnique;
};

