import React, { Component } from "react";
import classes from "./Auth.module.css";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions";

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
    isFormValid: false,
    isSignUp: true
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

  loginHandler = event => {
    event.preventDefault();
    this.props.onAuthenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
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
          SUBMIT
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.Auth}>
        <h4>Please {this.state.isSignUp ? "Sign-Up" : "Sign-In"}</h4>
        {form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
