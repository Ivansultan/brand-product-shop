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
    return (
      <div>
        <Cart place="PAGE" />
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
