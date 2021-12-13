import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { compose } from "recompose";
import store from "../store";
import { withParams } from "../utils";

type State = {};

export type Product = {
  id: string;
  name: string;
  description: string;
};

type ProductQueryResult = {
  loading: boolean;
  product: Product;
};

type Props = {
  params: { id: Product["id"] };
  data: ProductQueryResult;
};

class ProductPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  addProductToCart = () => {
    store.dispatch({
      type: "CART_ADD_ITEM",
      payload: { productId: this.props.params.id },
    });
  };

  render() {
    const { loading, product } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
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
          </div>
          <div style={{ marginTop: 10 }}>
            <big>$</big>
          </div>
          <div style={{ marginTop: 10 }}>
            <button>
              <p onClick={this.addProductToCart}>ADD TO CART</p>
            </button>
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
    }
  }
`;

const productQueryOptions = {
  options: (props: Props) => ({
    variables: {
      id: props.params.id,
    },
  }),
};

export default compose(
  withParams,
  graphql<any, any>(productQuery, productQueryOptions)
)(ProductPage as any);
