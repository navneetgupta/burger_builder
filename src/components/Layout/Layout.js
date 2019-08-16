import React, { Fragment, Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    sideBarClosed: false
  };
  toggleSidebarHandler = () => {
    const oldState = this.state.sideBarClosed;
    this.setState({ sideBarClosed: !oldState });
  };
  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.toggleSidebarHandler} />
        <Sidedrawer
          show={!this.state.sideBarClosed}
          clicked={this.toggleSidebarHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
