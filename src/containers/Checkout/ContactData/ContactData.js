import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest Delivery" },
            { value: "cheapest", displayValue: "Cheapest Delivery" },
            { value: "standard", displayValue: "Standard Delivery" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  placeOrderHandler = event => {
    event.preventDefault();
    console.log("Order Placed");
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  inputVlaueChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedFromElt = { ...updatedOrderForm[inputIdentifier] };
    updatedFromElt.value = event.target.value;
    updatedFromElt.valid = this.checkValidity(
      event.target.value,
      updatedFromElt.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFromElt;
    console.log(updatedFromElt);
    this.setState({
      orderForm: updatedOrderForm
    });
  };
  render() {
    const fromElmtArray = [];
    for (let key in this.state.orderForm) {
      fromElmtArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form method="post" onSubmit={this.placeOrderHandler}>
        {fromElmtArray.map(elmt => {
          return (
            <Input
              key={elmt.id}
              elementType={elmt.config.elementType}
              elementConfig={elmt.config.elementConfig}
              value={elmt.config.value}
              changed={event => this.inputVlaueChangeHandler(event, elmt.id)}
              name={elmt.id}
            />
          );
        })}
        <Button btnType="Success">Place Order</Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
