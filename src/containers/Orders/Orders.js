import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

class Orders extends Component {
  state = {
    orders: {},
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        console.log(res);
        this.setState({ orders: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        // this.setState({ loading: false, purchasing: false });
      });
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = Object.keys(this.state.orders).map(key => {
        const value = this.state.orders[key];
        return (
          <Order
            key={key}
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

export default withErrorHandler(Orders, axios);
