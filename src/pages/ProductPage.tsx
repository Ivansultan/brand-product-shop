import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";

type State = {};

type Product = {
  id: string;
  name: string;
  description: string;
};

type ProductQueryResult = {
  loading: boolean;
  product: Product;
};

type Props = {
  data: ProductQueryResult;
};

class ProductPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

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
              <p>ADD TO CART</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const productQuery = gql`
  query {
    product(id: "ps-5") {
      id
      name
      description
    }
  }
`;

export default (graphql(productQuery as any) as any)(ProductPage);
