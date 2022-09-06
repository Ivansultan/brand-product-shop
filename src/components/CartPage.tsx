import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { withParams } from "../utils";
import Cart from "./Cart";

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

  render() {
    // const { currency } = this.props;
    return (
      <div style={{ marginBottom: "274px" }}>
        <div
          style={{
            marginLeft: "100px",
            marginRight: "100px",
            marginTop: "80px",
            marginBottom: "55px",
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          CART
        </div>
        <hr
          style={{
            border: "0.1px solid lightGray",
            marginLeft: "100px",
            marginRight: "100px",
          }}
        ></hr>
        <Cart place="PAGE" />
        <div
          style={{
            marginTop: "32px",
            marginLeft: "100px",
            marginRight: "100px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "28px",
            }}
          >
            Tax 21%:
          </div>
          <div
            style={{
              marginTop: "8px",
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "28px",
            }}
          >
            Quantity:
          </div>
          <div
            style={{
              marginTop: "8px",
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "28px",
            }}
          >
            Total:
          </div>
          <div
            style={{
              marginTop: "16px",
              width: "279px",
              height: "43px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#5ECE7B",
            }}
          >
            ORDER
          </div>
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
)(CartPage as any) as any;
