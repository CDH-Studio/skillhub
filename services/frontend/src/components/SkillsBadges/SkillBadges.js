import React, {useMemo} from "react";
import {TextBadge} from "components/";
import "./SkillBadges.scss";

const SkillBadges = ({displayCount, skills}) => {
    displayCount = displayCount || skills.length;
    const mappedSkillBadges = useMemo(() => skills.slice(0, displayCount).map((skill) => {
        return (
            <SkillBadge
                key={skill.name}
                name={skill.name}
                isHighlySkilled={skill.isHighlySkilled}
            />
        );
    }), [skills, displayCount]);

    return (
        <>
            {mappedSkillBadges}
        </>
    );
};

const SkillBadge = ({name, isHighlySkilled = false}) => (
    <TextBadge
        className="skill-badge"
        text={name}
        isHighlighted={isHighlySkilled}
    />
);

export default SkillBadges;
