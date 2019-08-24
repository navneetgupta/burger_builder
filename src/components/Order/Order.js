import React from "react";
import classes from "./Order.module.css";

const Order = props => {
  let ingredients = null;
  if (props.ingredients) {
    ingredients = Object.keys(props.ingredients).map(key => {
      return (
        <p>
          <span style={{ textTransform: "capitalize" }}>{key}: </span>{" "}
          <strong>{props.ingredients[key]}</strong>
        </p>
      );
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
