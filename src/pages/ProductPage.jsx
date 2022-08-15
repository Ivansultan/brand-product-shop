import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { compose } from "recompose";
import { store } from "../store";
import { withParams } from "../utils";
import { AppState } from "../reducer";
import { connect } from "react-redux";

export const getPrice = (prices, currency) => {
  return prices.filter((item) => item.currency === currency)[0];
};

// type State = {
//   visibility: boolean;
// };

// type Price = {
//   amount: number;
// };

// export type Product = {
//   id: string;
//   name: string;
//   description: string;
//   prices: Price[];
//   gallery: string;
// };

// type ProductQueryResult = {
//   loading: boolean;
//   product: Product;
// };

// type StoreProps = {
//   cartItems: AppState["cartItems"];
//   currency: AppState["currency"];
// };
// type OwnProps = {
//   params: { id: Product["id"] };
//   data: ProductQueryResult;
// };
// type Props = OwnProps & StoreProps;

class ProductPage extends React.Component {
  constructor(props) {
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
          <div>
            <h3>Product ID: {product.id}</h3>
          </div>
          <div>
            <h3>About product: {product.description}</h3>
          </div>
          <div>
            <big>PRICE:</big>
            <div style={{ marginTop: 10 }}>{price.currency}</div>
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
      prices {
        currency
        amount
      }
    }
  }
`;

const productQueryOptions = {
  options: (props) => {
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

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
    currency: state.currency,
  };
};

export default compose(
  withParams,
  graphql(currencyQuery),
  graphql(productQuery, productQueryOptions),
  connect(mapStateToProps)
)(ProductPage);
