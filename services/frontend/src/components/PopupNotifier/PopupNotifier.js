import React, {useState, useEffect} from "react";
import connect from "./connect";
import PopupNotifierLayout from "./PopupNotifierLayout";
import "./PopupNotifier.scss";

const PopupNotifier = ({isLoading, notification}) => {
    const notificationMessage = notification ? notification.message : null;
    const notificationType = notification ? notification.type : null;

    const [open, setOpen] = useState(false);

    const openPopup = () => {
        setOpen(true);
    };

    const closePopup = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!isLoading && notification) {
            openPopup();
        }
    }, [isLoading, notification]);

    return (
        <PopupNotifierLayout
            open={open}
            notificationMessage={notificationMessage}
            notificationType={notificationType}
            closePopup={closePopup}
        />
    );
};

export default connect(PopupNotifier);