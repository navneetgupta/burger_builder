import React, { Component } from "react";

const AsyncComponent = inportComponent => {
  return class extends Component {
    state = {
      component: null
    };
    componentDidMount() {
      inportComponent().then(value => {
        this.setState({ component: value.default });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
