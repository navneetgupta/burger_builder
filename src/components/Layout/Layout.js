import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const Layout = props => (
  <Fragment>
    <Toolbar />
    <Sidedrawer />
    <main className={classes.Content}>{props.children}</main>
  </Fragment>
);

export default Layout;
