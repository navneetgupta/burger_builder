import React, { Fragment, Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
        <Toolbar
          drawerToggleClicked={this.toggleSidebarHandler}
          isAuth={this.props.isAuthenticated}
        />
        <Sidedrawer
          show={this.state.sideBarActive}
          clicked={this.toggleSidebarHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token != null
  };
};
export default connect(mapStateToProps)(withRouter(Layout));
