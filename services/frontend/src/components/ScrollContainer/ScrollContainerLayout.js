import React from "react";
import "./ScrollContainer.scss";

const ScrollContainer = ({children, className}) => {
    return (
        <div className="scroll-container">
            <div className={className}>
                {children}
            </div>
        </div>
    );
};

export default ScrollContainer;