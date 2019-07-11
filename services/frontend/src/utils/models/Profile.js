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

    static get FILTER_ALL() {
        return "all";
    }

    /* Normalizes the list of profiles that the API returns into a map of {ID -> Profile},
     * with the skills processed to just their IDs, for appropriate use in the Redux store. */
    static normalizeApiResultsForRedux(profiles = []) {
        const processProfile = (profile) => {
            const processedProfile = new Profile(profile);

            if (processedProfile.profileSkills) {
                processedProfile.profileSkills = processedProfile.profileSkills.map(({id}) => id);
            } else {
                processedProfile.profileSkills = [];
            }

            return processedProfile;
        };

        return profiles.reduce(arrayToObject({processor: processProfile}), {});
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

    static addSkills = (profile, updatedSkills, skills) => {
        const currentSkillsLC = profile.skills.map((skill) => skill.name.toLowerCase());

        /* Returns a list of the new skills entered */
        const newSkills = removeDuplicate(updatedSkills.reduce((acc, skillName) => {
            if (!currentSkillsLC.includes(skillName.toLowerCase())) {
                return [...acc, skillName];
            }
            return acc;
        }, []));

        /* Adds skill from database or Create new Skill */
        if (newSkills.length > 0) {
            for (const skill of Object.values(skills)) {
                const skillName = skill.name;
                const skillNameLC = skill.name.toLowerCase();
                if (newSkills.includes(skillNameLC)) {
                    profile.skills.push(skill);
                    newSkills.splice(newSkills.indexOf(skillName), 1);
                }
            }
        }

        /* Adds new Skill */
        if (newSkills.length > 0) {
            for (const skillName of newSkills) {
                const newSkill = new Skill({name: skillName});
                profile.skills.push(newSkill);
            }
        }
        return profile;
    };

    static removeSkills = (profile, updatedSkills) => {
        for (const skill of profile.skills) {
            if (!updatedSkills.includes(skill.name)) {
                profile.skills.splice(profile.skills.indexOf(skill), 1);
            }
        }
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

