import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredient: ingredient
  };
};
export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredient: ingredient
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: { ...ingredients }
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://react-mac-d.firebaseio.com/ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
