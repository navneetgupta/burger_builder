import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      cheese: 2,
      salad: 1,
      bacon: 1
    }
  };

  componentDidMount() {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    const state = { ...this.state.ingredients };
    for (let i of query.entries()) {
      // console.log(i);
      // const [key, value] = i;
      console.log(i[0], i[1]);
      state[i[0]] = +i[1];
    }
    console.log(state);
    this.setState({ ingredients: state });
  }

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
          ingredients={this.state.ingredients}
          checkoutCancelled={this.cancelCheckoutHandler}
          checkoutContinued={this.continueCheckoutHandler}
        />
      </div>
    );
  }
}

export default Checkout;
