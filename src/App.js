import React, { Component } from "react";
import AsyncComponent from "./hoc/AsyncComponent";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

const AsyncOrders = AsyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const AsyncCheckout = AsyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const AsyncAuth = AsyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onPageLoaded();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/authenticate" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/authenticate" component={AsyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPageLoaded: () => dispatch(actionCreators.authCheckState())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
