import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrderInit(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(value => {
        return (
          <Order
            key={value.id}
            totalPrice={value.price}
            ingredients={value.ingredients}
          />
        );
      });
    }
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>My Orders:</h2>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrderInit: token => dispatch(actionCreators.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
