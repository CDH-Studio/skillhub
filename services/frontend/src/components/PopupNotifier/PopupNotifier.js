import React, {useEffect} from "react";
import connect from "./connect";
import {useSnackbar} from "notistack";
import {IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import "./PopupNotifier.scss";

const PopupNotifier = ({notification}) => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        if (notification) {
            const action = (key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                    <Close className="popup-edit-icon" />
                </IconButton>
            );

            enqueueSnackbar(notification.message, {
                variant: notification.type,
                action
            });
        }
    }, [notification, enqueueSnackbar, closeSnackbar]);

    return null;
};

export default connect(PopupNotifier);