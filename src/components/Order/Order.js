import React from "react";
import classes from "./Order.module.css";

const Order = props => {
  return (
    <div className={classes.Order}>
      <h3>Order Detail:</h3>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price: <strong>USD 5.2</strong>
      </p>
    </div>
  );
};

export default Order;
