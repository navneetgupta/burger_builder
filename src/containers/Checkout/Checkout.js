import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  cancelCheckoutHandler = () => {
    console.log("checkout cancel");
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    console.log("checkout continue");
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.cancelCheckoutHandler}
          checkoutContinued={this.continueCheckoutHandler}
        />

        {/*<Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
				// Since We need the ingredients in contact data we will use
				*/}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};
export default connect(mapStateToProps)(Checkout);
