import React, {useState, useEffect} from "react";
import {IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import {Error, Close} from "@material-ui/icons";
import "./PopupNotifier.scss";

const PopupNotifier = ({isLoading, errorMessage}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!isLoading && errorMessage) {
            handleClick();
        }
    }, [isLoading, errorMessage]);

    return (
        <Snackbar
            className="error-popup"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <SnackbarContent
                className="error-popup-content"
                message={
                    <span className="error-popup-content-message">
                        <Error className="error-popup-content-icon" />
                        {errorMessage}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="Close" onClick={handleClose}>
                        <Close />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
};

export default PopupNotifier;