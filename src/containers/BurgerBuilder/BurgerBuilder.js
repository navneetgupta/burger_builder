import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = { ...this.state.ingredients };
    const oldPrice = this.state.totalPrice;
    const updatedTotalPrice = oldPrice + INGREDIENS_PRICE[type];
    updateIngredients[type] = updatedCount;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: updatedTotalPrice
    });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updateIngredients = { ...this.state.ingredients };
    const oldPrice = this.state.totalPrice;
    const updatedTotalPrice = oldPrice - INGREDIENS_PRICE[type];
    updateIngredients[type] = updatedCount;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: updatedTotalPrice
    });
    this.updatePurchaseState(updateIngredients);
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((p, c) => {
        return p + c;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
