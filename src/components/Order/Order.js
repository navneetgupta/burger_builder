import React from "react";
import classes from "./Order.module.css";

const Order = props => {
  let ingredients = null;
  if (props.ingredients) {
    ingredients = Object.keys(props.ingredients).map(key => {
      return props.ingredients[key] > 0 ? (
        <span
          key={key}
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            padding: "5px",
            margin: "0 8px",
            border: "1px solid #ccc"
          }}
        >
          {key}:<strong>({props.ingredients[key]}) </strong>{" "}
        </span>
      ) : null;
    });
  }
  return (
    <div className={classes.Order}>
      <h3>Order Detail:</h3>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>USD {props.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
