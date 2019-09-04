import React, { Fragment } from "react";
import classes from "./Sidedrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidedrawer = props => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={attachedClasses.join(" ")} onClick={props.clicked}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidedrawer;
