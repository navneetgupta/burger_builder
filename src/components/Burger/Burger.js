import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(type => {
    return [...Array(props.ingredients[type])].map((_, i) => {
      return <BurgerIngredient key={type + i} type={type} />;
    });
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
