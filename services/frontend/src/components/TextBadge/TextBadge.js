import React from "react";
import classNames from "classnames";
import "./TextBadge.scss";

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

export default TextBadge;
