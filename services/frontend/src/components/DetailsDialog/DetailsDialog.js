import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {DetailsForm} from "components/";
import "./DetailsDialog.scss";

const DetailsDialog = ({closeDialog, dialogTitle, formFieldData, open, onSubmit}) => (
    <Dialog className="details-dialog"
        open={open}
        onClose={closeDialog}
    >
        <DialogTitle className="details-dialog-title">
            {dialogTitle}
        </DialogTitle>
        <DialogContent
            className="details-dialog-content"
            dividers={true}
        >
            <DetailsForm
                formFieldData={formFieldData}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog} color="primary">
                Cancel
            </Button>
            <Button onClick={onSubmit} color="primary">
                Submit
            </Button>
        </DialogActions>
    </Dialog>
);

export default DetailsDialog;