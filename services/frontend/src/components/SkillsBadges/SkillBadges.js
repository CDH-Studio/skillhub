import React, {useMemo} from "react";
import classNames from "classnames";
import "./SkillBadges.scss";

const SkillBadges = ({displayCount, skills}) => {
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

const TextBadge = ({className, text, isHighlighted = false}) => (
    <div
        className={classNames(
            "text-badge",
            {"text-badge--highlighted": isHighlighted},
            className
        )}
    >
        {text}
    </div>
);

export default SkillBadges;
