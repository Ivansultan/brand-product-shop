import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { withParams } from "../utils";
import Cart from "./Cart";
import styles from "./CartPage.module.css";
import { getPrice } from "../pages/ProductPage";
import { currencyLabel } from "../utils";
import { Product } from "../graphql/types";


type OwnProps = {};

type NavigationProps = {
  params: { id: Product["id"] };
}

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};

type GraphQLProps = {
  data: CartQueryResult;
}

type CartQueryResult = {
  product: Product;
};

type Props = OwnProps & NavigationProps & StoreProps & GraphQLProps;

type State = {};

class CartPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const { currency } = this.props;

    const total = this.props.cartItems.reduce((sum, item) => {
      const price = getPrice(item.prices, currency); // price on 1 item
      return sum + price.amount * item.quantity;
    }, 0);

    const quantity = this.props.cartItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    const tax = total * 0.21;

    return (
      <div className={styles["cart-page"]}>
        <div className={styles["cart-title"]}>CART</div>
        <hr className={styles["delimiter"]}></hr>
        <Cart place="PAGE" />
        <div className={styles["ordering"]}>
          <div className={styles["cart-tax"]}>
            Tax 21%: {currencyLabel[this.props.currency]} {tax.toFixed(2)}
          </div>

          <div className={styles["cart-quantity"]}>Quantity: {quantity}</div>

          <div className={styles["cart-total"]}>
            Total: {currencyLabel[this.props.currency]} {total.toFixed(2)}
          </div>
          <div className={styles["order-button"]}>ORDER</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    cartItems: state.cartItems,
    currency: state.currency,
  };
};

export default compose<Props, OwnProps>(
  withParams,
  connect(mapStateToProps)
)(CartPage);
