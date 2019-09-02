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
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(({ label, type }) => {
        return (
          <BuildControl
            key={type}
            label={label}
            added={() => props.ingredientAdded(type)}
            removed={() => props.ingredientRemoved(type)}
            disabled={props.disabled[type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchase}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN UP/ SING IN TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
