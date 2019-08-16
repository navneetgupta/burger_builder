import React from "react";
import classes from "./Sidedrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";

const Sidedrawer = props => {
  return (
    <div className={classes.Sidedrawer}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default Sidedrawer;
