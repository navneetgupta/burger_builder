import React, { Fragment, Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  UNSAFE_componentWillUpdate() {
    console.log("[OrderSummary] will Update");
  }
  render() {
    const ingredinetSummary = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
          {this.props.ingredients[key]}{" "}
        </li>
      );
    });
    return (
      <Fragment>
        <h3>Your Order:</h3>
        <p> A delicious burger with the following ingredients</p>
        <ul>{ingredinetSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.checkout}>
          Continue
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
