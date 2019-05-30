import React from "react";
import classNames from "classnames";
import {Button, CircularProgress} from "@material-ui/core";
import "./LoadingButton.scss";

const LoadingButton = ({className, loading, children, ...otherProps}) => (
    <Button
        className={classNames("loading-button", className)}
        {...otherProps}
    >
        {
            loading ? (
                <CircularProgress className="loading-button-indicator" />
            ) : (
                children
            )
        }
    </Button>
);

export default LoadingButton;
