import React from "react";
import classNames from "classnames";
import "./ScrollContainer.scss";

const ScrollContainerLayout = ({children, className}) => {
    return (
        <div className="scroll-container">
            <div className={classNames("content-area", className)}>
                {children}
            </div>
        </div>
    );
};

export default ScrollContainerLayout;