import React from "react";
import ScrollContainerLayout from "./ScrollContainerLayout";

const ScrollContainer = ({children}) => (
    <ScrollContainerLayout>
        {children}
    </ScrollContainerLayout>
);

export default ScrollContainer;