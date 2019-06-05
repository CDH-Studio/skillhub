import React from "react";
import "./ScrollContainer.scss";

const ScrollContainer = ({children}) => {
    return (
        <div className="scroll-container">
            <div className="content-area">
                {children}
            </div>
        </div>
    );
};

export default ScrollContainer;