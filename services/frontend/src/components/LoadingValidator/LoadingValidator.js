import React, {useState} from "react";
import {Button, CircularProgress, IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
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

const SimpleSnackbar = ({open, handleClose}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
                "aria-describedby": "message-id",
            }}
            message={<span id="message-id">Note archived</span>}
            action={[
                <Button key="undo" color="secondary" size="small" 
                    onClick={handleClose}
                >
                    UNDO
                </Button>,
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    //onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
};

/* Shows a circular progress loader if the component is currently loading,
renders an inputted component (componentOnFailedLoad) if one of the dependencies is empty */
const LoadingValidator = ({isLoading, renderOnLoad, renderOnFailedLoad, dependencies, error}) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    if (isLoading || missingDependency(dependencies)) {
        return <CircularProgress className="loading-indicator" />;
    }
    else {
        if (emptyDependency(dependencies)) {
            return renderOnFailedLoad;
        } else {
            return (
                <>
                    {error ? (
                        <SimpleSnackbar
                            key={error}
                            handleClick={handleClick}
                            handleClose={handleClose}
                            open={open}
                        />
                    ) : (
                        null
                    )}
                    {renderOnLoad}
                </>
            );
        }
    }
};

export default LoadingValidator;
