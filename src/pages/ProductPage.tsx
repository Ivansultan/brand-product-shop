import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { compose } from "recompose";
import store from "../store";
import { withParams } from "../utils";
import { AppState } from "../reducer";
import { connect } from "react-redux";
import { currencyLabel } from "../utils";

export const getPrice = (
  prices: Price[],
  currency: AppState["currency"]
): Price => {
  return prices.filter((item) => item.currency === currency)[0];
};

type State = {
  visibility: boolean;
};

type Price = {
  currency: AppState["currency"];
  amount: number; // price for 1 item
};

export type Product = {
  id: string;
  name: string;
  description: string;
  prices: Price[];
  gallery: string;
};

type ProductQueryResult = {
  loading: boolean;
  product: Product;
};

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};
type OwnProps = {
  params: { id: Product["id"] };
  data: ProductQueryResult;
};
type Props = OwnProps & StoreProps;

class ProductPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  addProductToCart = () => {
    store.dispatch({
      type: "CART_ADD_ITEM",
      payload: { product: this.props.data.product },
    });
  };

  deleteProductFromCart = () => {
    store.dispatch({
      type: "CART_REMOVE_ITEM",
      payload: { product: this.props.data.product },
    });
  };

  render() {
    const { loading, product } = this.props.data;
    const { currency } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    const inCart = this.props.cartItems
      .map((item) => item.id)
      .includes(product.id);
    const cartButtonTitle = inCart ? "Remove" : "Add to Cart";
    const cartButtonCallback = inCart
      ? this.deleteProductFromCart
      : this.addProductToCart;

    const price = getPrice(product.prices, currency);

    return (
      <div>
        <div>
          <h1>Product Page</h1>
        </div>
        <div>
          <div>
            <h3>Product name: {product.name}</h3>
          </div>
          <img
            alt=""
            style={{ width: 100, height: 100 }}
            src={product.gallery[0]}
          />
          <div>
            <h3>Product ID: {product.id}</h3>
          </div>
          <div>
            <h3>About product: {product.description}</h3>
          </div>
          <div>
            <big>PRICE:</big>
            <div style={{ marginTop: 10 }}>{currencyLabel[price.currency]}</div>
            <div>{price.amount}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            <button onClick={cartButtonCallback}>{cartButtonTitle}</button>
          </div>
        </div>
      </div>
    );
  }
}

const productQuery = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      description
      gallery
      prices {
        currency
        amount
      }
    }
  }
`;

const productQueryOptions = {
  options: (props: Props) => {
    return {
      variables: {
        id: props.params.id,
      },
    };
  },
};

const currencyQuery = gql`
  query {
    currencies
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    cartItems: state.cartItems,
    currency: state.currency,
  };
};

export default compose(
  withParams,
  graphql(currencyQuery as any) as any,
  graphql<any, any>(productQuery, productQueryOptions),
  connect<StoreProps, {}, OwnProps>(mapStateToProps as any)
)(ProductPage as any);
