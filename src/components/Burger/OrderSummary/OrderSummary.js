import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredinetSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {props.ingredients[key]}{" "}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order:</h3>
      <p> A delicious burger with the following ingredients</p>
      <ul>{ingredinetSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkout}>
        Continue
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
