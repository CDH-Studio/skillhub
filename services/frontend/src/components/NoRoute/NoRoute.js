import React from "react";
import {Link} from "react-router-dom";
import {Button, Paper} from "@material-ui/core";
import ScreenUrls from "utils/screenUrls";
import "./NoRoute.scss";

const NoRoute = () => (
    <Paper className="invalid-route">
        <h1 className="invalid-route-error">
            404
        </h1>
        <h2>
            Page Not Found
        </h2>
        <Link to={ScreenUrls.SEARCH}>
            <Button color="primary">
                Back to Search
            </Button>
        </Link>
    </Paper>
);

export default (NoRoute);