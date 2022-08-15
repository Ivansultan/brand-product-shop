import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { getPrice } from "../pages/ProductPage";
import { withParams } from "../utils";
import { Link } from "react-router-dom";
import { currencyLabel } from "../utils";
import Cart from "./Cart";

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

class CartPopup extends React.Component<Props, State> {
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
        <div
          style={{
            // marginLeft: "22px",
            border: "transparent",
          }}
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <img
            style={{
              width: 16,
              height: 16,
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH6xTvUOEaGNvhxL2HaGfdzcwafH1bVCHzWQ&amp;usqp=CAU"
            alt="IconCart"
          />
        </div>

        {itemsInCart >= 1 ? (
          <div
            style={{
              position: "relative",
              bottom: "30px",
              left: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "18px",
              height: "18px",
              backgroundColor: "black",
              borderRadius: "9px",
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {itemsInCart}
          </div>
        ) : (
          ""
        )}

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
            <Cart place="POPUP" />

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
              <Link to={`/`}>
                <button>CHECK OUT</button>
              </Link>
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
)(CartPopup as any) as any;
