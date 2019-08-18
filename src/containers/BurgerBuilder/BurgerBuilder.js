import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://react-mac-d.firebaseio.com/ingredients.json")
      .then(res => {
        const totalPrice = 4.5; // To Update based on default ingredients
        // Need to update purchaisng state also
        this.setState({
          loading: false,
          purchasing: false,
          ingredients: res.data,
          totalPrice: totalPrice
        });
        this.updatePurchaseState(res.data);
      })
      .catch(err => {
        // this.setState({ loading: false, purchasing: false });
      });
  }
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

  updatePurchasingState = () => {
    const oldPurchasingState = this.state.purchasing;
    this.setState({ purchasing: !oldPurchasingState });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Sobhit Gupta",
        address: {
          street1: "101, Raymond Road",
          street2: "Plakiesfnete Market, Gandu.",
          zipCode: 12344,
          country: "Zincronia"
        },
        email: "stesfdf@sfdg.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = <Spinner />;
    let orderSummary = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            purchase={this.updatePurchasingState}
          />
        </Fragment>
      );
      if (!this.state.loading) {
        orderSummary = (
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.updatePurchasingState}
            continue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        );
      }
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.updatePurchasingState}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
