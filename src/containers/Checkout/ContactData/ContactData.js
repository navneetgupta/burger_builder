import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler";
import * as actionCreators from "../../../store/actions";
import { updateObject } from "../../../shared/utility";

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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
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
        value: "fastest",
        valid: true
      }
    },
    isFormValid: false
  };
  placeOrderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
      // var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
      // isValid = re.test(value);
    }
    return isValid;
  };
  inputVlaueChangeHandler = (event, inputIdentifier) => {
    const updatedFromElt = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        this.state.orderForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFromElt
    });

    console.log(updatedFromElt);
    let isFormValid = true;
    for (let identifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[identifier].valid && isFormValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: isFormValid
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
              invalid={!elmt.config.valid}
              changed={event => this.inputVlaueChangeHandler(event, elmt.id)}
              name={elmt.id}
              shouldValidate={elmt.config.validation}
              touched={elmt.config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Place Order
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurgerStart(orderData, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
