import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { getPrice } from "../pages/ProductPage";
import { withParams } from "../utils";
import store from "../store";
import { Link } from "react-router-dom";
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

type State = {
  visibility: boolean;
};

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibility: false,
    };
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
    let itemsInCart = this.props.cartItems.reduce((sum, item) => {
      const quantity = 1;
      return sum + quantity;
    }, 0);
    const total = this.props.cartItems.reduce((sum, item) => {
      const price = getPrice(item.prices, currency); // price on 1 item
      return sum + price.amount * item.quantity;
    }, 0);

    return (
      <div>
        <button
          style={{ marginTop: "28px", border: "transparent" }}
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <img
            style={{
              width: 24,
              height: 16,
            }}
            src="https://w7.pngwing.com/pngs/225/984/png-transparent-computer-icons-shopping-cart-encapsulated-postscript-shopping-cart-angle-black-shopping.png"
            alt="IconCart"
          />
        </button>
        {this.state.visibility ? (
          <div
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              width: 150,
              height: 200,
              border: "1px solid red",
              display: "flex", // to hide use "none"
              flexDirection: "column",
            }}
          >
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
                        style={
                          cartItem.quantity > 1 ? { cursor: "pointer" } : {}
                        }
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
            <div>
              <p>My Bag, {itemsInCart} items</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <p>Total {total} </p>
              {currencyLabel[this.props.currency]}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Link to={`/cart`}>
                <button>VIEW BAG</button>
              </Link>
              <button>CHECK OUT</button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "none",
            }}
          ></div>
        )}
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
)(Cart as any);
