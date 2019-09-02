import React, { Fragment } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {/*<NavigationItem link="/checkout">Checkout</NavigationItem>*/}

      {props.isAuthenticated ? (
        <Fragment>
          <NavigationItem link="/orders">My Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Fragment>
      ) : (
        <NavigationItem link="/authenticate">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
