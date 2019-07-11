import React from "react";
import {IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import {Close, Error, CheckCircle} from "@material-ui/icons";
import "./PopupNotifier.scss";

const MessagePopup = ({onClose, closePopup, notificationMessage, notificationType}) => (
    <SnackbarContent
        className={"popup-content--" + notificationType}
        message={
            <span className="popup-content-message">
                {
                    notificationType === "success" ? (
                        <CheckCircle className="popup-content-icon" />
                    ) : (
                        <Error className="popup-content-icon" />
                    )
                }
                {notificationMessage}
            </span>
        }
        action={[
            <IconButton key="close" aria-label="Close" onClick={closePopup}>
                <Close className="popup-edit-icon" />
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
        onClose={closePopup}
    >
        <MessagePopup
            notificationType={notificationType}
            notificationMessage={notificationMessage}
            closePopup={closePopup}
        />
    </Snackbar>
);

export default PopupNotifierLayout;