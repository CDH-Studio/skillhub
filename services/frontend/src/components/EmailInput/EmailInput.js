import React from "react";
import classNames from "classnames";
import {TextField} from "@material-ui/core";
import "./EmailInput.scss";

const EmailInput = ({className, invalid = false, ...otherProps}) => (
    <TextField
        className={classNames("email-input", className)}
        label="Email"
        error={invalid}
        helperText={invalid ? "Invalid email" : ""}
        {...otherProps}
    />
);

export default EmailInput;
