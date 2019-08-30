import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((p, c) => {
        return p + c;
      }, 0);
    return sum > 0;
  };

  updatePurchasingState = () => {
    const oldPurchasingState = this.state.purchasing;
    this.setState({ purchasing: !oldPurchasingState });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.props.error ? (
      <p>Ingredients could not be fetched!!</p>
    ) : (
      <Spinner />
    );
    let orderSummary = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={ingredient =>
              this.props.onIngedientAdded(ingredient)
            }
            ingredientRemoved={ingredient =>
              this.props.onIngredientRemoved(ingredient)
            }
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            purchase={this.updatePurchasingState}
          />
        </Fragment>
      );
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngedientAdded: ingredient =>
      dispatch(actionCreator.addIngredient(ingredient)),
    onIngredientRemoved: ingredient =>
      dispatch(actionCreator.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actionCreator.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
