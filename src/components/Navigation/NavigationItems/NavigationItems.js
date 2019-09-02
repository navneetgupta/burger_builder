import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/checkout">Checkout</NavigationItem>
      <NavigationItem link="/orders">My Orders</NavigationItem>
      <NavigationItem link="/authenticate">Authenticate</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
