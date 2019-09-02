import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onPageLoaded();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/authenticate" component={Auth} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPageLoaded: () => dispatch(actionCreators.authCheckState())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
