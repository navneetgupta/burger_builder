import React, { Fragment, Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    sideBarActive: false
  };
  toggleSidebarHandler = () => {
    const oldState = this.state.sideBarActive;
    this.setState({ sideBarActive: !oldState });
  };
  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.toggleSidebarHandler} />
        <Sidedrawer
          show={this.state.sideBarActive}
          clicked={this.toggleSidebarHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
