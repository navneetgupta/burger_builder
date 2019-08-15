import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(type => {
      return [...Array(props.ingredients[type])].map((_, i) => {
        return <BurgerIngredient key={type + i} type={type} />;
      });
    })
    .reduce((arr, elt) => {
      return arr.concat(elt);
    }, []);
  if (transformedIngredients.length < 1) {
    transformedIngredients = <p>Please start adding ingredients!!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
