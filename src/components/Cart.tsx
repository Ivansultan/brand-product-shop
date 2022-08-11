import React from "react";
import { AppState } from "../reducer";
import store from "../store";
import { getPrice } from "../pages/ProductPage";
import { currencyLabel } from "../utils";
import { compose } from "recompose";
import { withParams } from "../utils";
import { connect } from "react-redux";
import ProductAttributes from "./ProductAttributes";

type Props = OwnProps & StoreProps;

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};
type OwnProps = {
  params: { id: Product["id"] };
  data: CartQueryResult;
  place: "PAGE" | "POPUP";
};

type CartQueryResult = {
  product: Product;
};

type Product = {
  id: string;
  name: string;
  description: string;
  prices: Price[];
};

type Price = {
  currency: AppState["currency"];
  amount: number;
  quantity: number;
};
type State = {};

class Cart extends React.Component<Props, State> {
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
    const { currency, place } = this.props;

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.props.cartItems.map((cartItem) => {
          const price = getPrice(cartItem.prices, currency);
          return (
            <div key={cartItem.id}>
              {cartItem.name}
              {currencyLabel[this.props.currency]}
              {price.amount}

              <div>
                <ProductAttributes
                  attributes={cartItem.attributes}
                  place={place}
                />
              </div>

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
)(Cart as any) as any;
