import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];
const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(({ label, type }) => {
        return (
          <BuildControl
            key={type}
            label={label}
            added={() => props.ingredientAdded(type)}
          />
        );
      })}
    </div>
  );
};

export default BuildControls;
