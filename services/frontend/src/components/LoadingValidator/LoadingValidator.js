import React from "react";
import {CircularProgress} from "@material-ui/core";
import {PopupNotifier} from "components/";
import "./LoadingValidator.scss";

/* Check if any of our dependencies haven't been loaded up yet */
const missingDependency = (dependencies) => dependencies.reduce((acc, currentDependency) => {
    return acc || !currentDependency;
}, false);

/* Check if any of our dependencies have no data to be loaded into the page */
const emptyDependency = (dependencies) => dependencies.reduce((acc, currentDependency) => {
    if (currentDependency.isArray) {
        return acc || (currentDependency.length === 0);
    }
    else if (typeof currentDependency === "object") {
        return acc || (Object.keys(currentDependency).length === 0);
    }
    return acc;
}, false);

/* Shows a circular progress loader if the component is currently loading,
renders an inputted component (componentOnFailedLoad) if one of the dependencies is empty */
const LoadingValidator = ({isLoading, renderOnLoad, renderOnFailedLoad, dependencies, dataRequests}) => {
    if (isLoading || missingDependency(dependencies)) {
        return <CircularProgress className="loading-indicator" />;
    }
    else {
        const popupNotifiers = dataRequests.map((requestData, index) => (
            <PopupNotifier
                key={index}
                isLoading={requestData.isLoading}
                errorMessage={requestData.error ? requestData.error.message : null}
                successMessage="success"
            />
        ));

        if (emptyDependency(dependencies)) {
            return renderOnFailedLoad;
        } else {
            return (
                <>
                    {popupNotifiers}
                    {renderOnLoad}
                </>
            );
        }
    }
};

export default LoadingValidator;
