import React from "react";
import classes from "./Spinner.module.css";

const Spinner = props => {
  return <div className={classes.Loader}>Loading...</div>;
  // return <div className={classes.LdsHeart}></div>;
};
export default Spinner;
