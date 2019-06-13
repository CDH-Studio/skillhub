import React from "react";
import ScrollContainerLayout from "./ScrollContainerLayout";

const ScrollContainer = ({children, className}) => (
    <ScrollContainerLayout className={className}>
        {children}
    </ScrollContainerLayout>
);

export default ScrollContainer;