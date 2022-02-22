import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { getPrice } from "../pages/ProductPage";
import { withParams } from "../utils";
import { Link } from "react-router-dom";
import { currencyLabel } from "../utils";
import CartPage from "./CartPage";

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
  attributes: Attribute[];
};

type Price = {
  currency: AppState["currency"];
  amount: number;
  quantity: number;
};

type Attribute = {
  id: string;
  name: string;
  items: Item[];
  type: string;
};

type Item = {
  displayValue: string;
  id: string;
  colorProduct: string;
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
          style={{ marginLeft: "22px", border: "transparent" }}
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

        {itemsInCart >= 1 ? itemsInCart : ""}

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
            <CartPage place="POPUP" />

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
