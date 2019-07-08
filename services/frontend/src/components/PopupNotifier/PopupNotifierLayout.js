import React from "react";
import {IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import {Close, Error, CheckCircle} from "@material-ui/icons";
import "./PopupNotifier.scss";

const SuccessPopup = ({notificationMessage, closePopup}) => (
    <SnackbarContent
        className="popup-content--success"
        message={
            <span className="popup-content-message">
                <CheckCircle className="popup-content-icon" />
                {notificationMessage}
            </span>
        }
        action={[
            <IconButton key="close" aria-label="Close" onClick={closePopup}>
                <Close />
            </IconButton>,
        ]}
    />
);

const ErrorPopup = ({notificationMessage, closePopup}) => (
    <SnackbarContent
        className="popup-content--error"
        message={
            <span className="popup-content-message">
                <Error className="popup-content-icon" />
                {notificationMessage}
            </span>
        }
        action={[
            <IconButton key="close" aria-label="Close" onClick={closePopup}>
                <Close />
            </IconButton>,
        ]}
    />
);

const PopupNotifierLayout = ({closePopup, notificationMessage, notificationType, open}) => (
    <Snackbar
        className="popup"
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={closePopup}
    >
        {
            (notificationType === "success") ? (
                <SuccessPopup
                    notificationMessage={notificationMessage}
                    closePopup={closePopup}
                />
            ) : (
                <ErrorPopup
                    notificationMessage={notificationMessage}
                    closePopup={closePopup}
                />
            )
        }
    </Snackbar>
);

export default PopupNotifierLayout;