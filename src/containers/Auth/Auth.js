import React, { Component } from "react";
import classes from "./Auth.module.css";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isFormValid: false
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
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
      isValid = re.test(value);
    }
    return isValid;
  };

  inputValueChangeHandler = (event, inputIdentifier) => {
    // const updatedControls = { ...this.state.controls };
    //
    // const updatedControlsElt = { ...updatedControls[inputIdentifier] };
    // updatedControlsElt.value = event.target.value;
    // updatedControlsElt.valid = this.checkValidity(
    //   event.target.value,
    //   updatedControlsElt.validation
    // );
    // updatedControlsElt.touched = true;
    // updatedControls[inputIdentifier] = updatedControlsElt;
    // console.log(updatedControlsElt);
    //
    const updatedControls = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
        touched: true
      }
    };
    let isFormValid = true;
    for (let identifier in updatedControls) {
      isFormValid = updatedControls[identifier].valid && isFormValid;
    }
    this.setState({
      controls: updatedControls,
      isFormValid: isFormValid
    });
  };

  render() {
    const fromElmtArray = [];
    for (let key in this.state.controls) {
      fromElmtArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = (
      <form method="post" onSubmit={this.loginHandler}>
        {fromElmtArray.map(elmt => {
          return (
            <Input
              key={elmt.id}
              elementType={elmt.config.elementType}
              elementConfig={elmt.config.elementConfig}
              value={elmt.config.value}
              invalid={!elmt.config.valid}
              changed={event => this.inputValueChangeHandler(event, elmt.id)}
              name={elmt.id}
              shouldValidate={elmt.config.validation}
              touched={elmt.config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          Login
        </Button>
      </form>
    );
    // if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.Auth}>
        <h4>Please Login</h4>
        {form}
      </div>
    );
  }
}

export default Auth;
