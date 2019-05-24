import React from "react";
import {Logo} from "assets/icons";
import "./Profile.scss";
import { Button, Tabs, Tab, Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

export default function ProfileLayoutj() {
  const classes = useStyles();
  return <div className={classes.root} />;
}

