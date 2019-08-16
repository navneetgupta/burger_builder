import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button onClick={props.added} className={classes.Less}>
        -
      </button>
      <button onClick={props.added} className={classes.More}>
        +
      </button>
    </div>
  );
};

export default BuildControl;
