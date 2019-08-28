import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    // axios
    //   .get("https://react-mac-d.firebaseio.com/ingredients.json")
    //   .then(res => {
    //     const totalPrice = 4.0; // To Update based on default ingredients
    //     // Need to update purchaisng state also
    //     this.setState({
    //       loading: false,
    //       purchasing: false,
    //       ingredients: res.data,
    //       totalPrice: totalPrice
    //     });
    //     this.updatePurchaseState(res.data);
    //   })
    //   .catch(err => {
    //     // this.setState({ loading: false, purchasing: false });
    //   });
  }

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
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
      );
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = <Spinner />;
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
            purchasable={this.state.purchasable}
            price={this.props.price}
            purchase={this.updatePurchasingState}
          />
        </Fragment>
      );
      if (!this.state.loading) {
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ings}
            cancel={this.updatePurchasingState}
            continue={this.purchaseContinueHandler}
            price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngedientAdded: ingredient =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredient: ingredient }),
    onIngredientRemoved: ingredient =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredient: ingredient })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
