import React from "react";
import classes from "./Sidedrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";

const Sidedrawer = props => {
  return (
    <div className={classes.Sidedrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default Sidedrawer;
