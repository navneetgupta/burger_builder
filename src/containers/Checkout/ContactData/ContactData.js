import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
class ContactData extends Component {
  state = {
    name: "Navneet",
    email: "test@test.com",
    address: {
      street: "Street 1",
      postalCode: 123456
    }
  };
  placeOrderHandler = () => {
    console.log("Order Placed");
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalCode"
            placeholder="Postal Code"
          />
          <Button btnType="Success" onClick={this.placeOrderHandler}>
            Place Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
