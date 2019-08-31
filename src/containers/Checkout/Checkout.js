import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

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
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.cancelCheckoutHandler}
            checkoutContinued={this.continueCheckoutHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.orderReducer.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
