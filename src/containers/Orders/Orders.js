import React, { Component } from "react";
import Order from "../../components/Order/Order";

class Orders extends Component {
  render() {
    return (
      <div>
        <h2>My Orders:</h2>
        <div>
          <Order />
          <Order />
        </div>
      </div>
    );
  }
}

export default Orders;
