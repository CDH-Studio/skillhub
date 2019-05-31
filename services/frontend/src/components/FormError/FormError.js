import React from "react";
import classNames from "classnames";
import {Error} from "@material-ui/icons";
import "./FormError.scss";

const FormError = ({className, message = ""}) => (
    <div
        className={classNames(
            "form-error",
            {"form-error--visible": message && message !== ""},
            className
        )}
    >
        <Error color="error" fontSize="small" />
        <p className="form-error-message">{message}</p>
    </div>
);

export default FormError;
