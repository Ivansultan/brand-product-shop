import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { getPrice } from "../pages/ProductPage";
import { withParams } from "../utils";
import store from "../store";
import { currencyLabel } from "../utils";

type Props = OwnProps & StoreProps;

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};
type OwnProps = {
  params: { id: Product["id"] };
  data: CartQueryResult;
};

type CartQueryResult = {
  product: Product;
};

type Product = {
  id: string;
  name: string;
  description: string;
  prices: Price[];
  gallery: string;
};

type Price = {
  currency: AppState["currency"];
  amount: number;
  quantity: number;
};

type State = {};

class CartPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  incrementItem = (product: any) => {
    store.dispatch({
      type: "CART_INCREMENT_ITEM",
      payload: { product },
    });
  };
  decrementItem = (product: any) => {
    store.dispatch({
      type: "CART_DECREMENT_ITEM",
      payload: { product },
    });
  };

  render() {
    const { currency } = this.props;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.props.cartItems.map((cartItem) => {
            const price = getPrice(cartItem.prices, currency);
            return (
              <div key={cartItem.id}>
                {cartItem.name}
                {currencyLabel[this.props.currency]}
                {price.amount}

                <div>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => this.incrementItem(cartItem)}
                  >
                    +
                  </button>
                  {cartItem.quantity}
                  <button
                    style={cartItem.quantity > 1 ? { cursor: "pointer" } : {}}
                    onClick={() => {
                      if (cartItem.quantity > 1) {
                        this.decrementItem(cartItem);
                      }
                    }}
                  >
                    -
                  </button>
                </div>

                <img
                  alt=""
                  style={{ width: 50, height: 50 }}
                  src={cartItem.gallery[0]}
                />
              </div>
            );
          })}
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

export default compose(
  withParams,
  connect<StoreProps, {}, OwnProps>(mapStateToProps as any)
)(CartPage as any);
