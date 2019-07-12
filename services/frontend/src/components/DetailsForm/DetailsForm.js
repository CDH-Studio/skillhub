import React from "react";
import {TextField} from "@material-ui/core";
import "./DetailsForm.scss";

const DetailsForm = (formFieldData) => (
    <form className="details-form">
        {
            Object.keys(formFieldData).map((fieldKey) => (
                <TextField
                    key={formFieldData[fieldKey].label}
                    margin="dense"
                    {...formFieldData[fieldKey]}
                />
            ))
        }
    </form>
);

export default DetailsForm;