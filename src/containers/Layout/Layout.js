import React, { Fragment, Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";
import { withRouter } from "react-router-dom";

class Layout extends Component {
  state = {
    sideBarActive: false
  };
  toggleSidebarHandler = () => {
    const oldState = this.state.sideBarActive;
    this.setState({ sideBarActive: !oldState });
  };
  componentDidMount() {
    console.log("Layout Component");
    console.log(this.props);
  }
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

export default withRouter(Layout);
