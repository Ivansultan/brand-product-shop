import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";
import { Link } from "react-router-dom";
import { AppState } from "../reducer";
import { compose } from "recompose";
import { connect } from "react-redux";
import { getPrice } from "./ProductPage";
import { currencyLabel } from "../utils";

type Price = {
  currency: AppState["currency"];
  amount: number;
};

type Gallery = string;

type Product = {
  id: string;
  name: string;
  brand: string;
  amount: number;
  gallery: Gallery[];
  prices: Price[];
};

type Category = {
  name: string;
  products: Product[];
};

type CategoryQueryResult = {
  loading: boolean;
  category: Category;
};

type Props = OwnProps & StoreProps & OriginalProps;

type OriginalProps = {
  data: CategoryQueryResult;
};

type StoreProps = {
  currency: AppState["currency"];
};

type OwnProps = {
  data: CurrencyQueryResult;
};

type CurrencyQueryResult = {
  loading: boolean;
  currencies: AppState["currency"][];
};

type State = {};

class CategoryPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const { loading, category } = this.props.data;
    const { currency } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ marginTop: "40px", marginBottom: "100px" }}>
        <h1 style={{ paddingLeft: "100px", margin: 0 }}>Category name</h1>
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {category.products.map((product) => {
            const price = getPrice(product.prices, currency);
            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div
                  key={product.id}
                  style={{
                    // border: "1px solid black",
                    padding: "16px",
                    backgroundColor: "#f0f5f5",
                    margin: 15,
                  }}
                >
                  <img
                    style={{
                      width: "315px",
                      height: "315px",
                    }}
                    alt=""
                    src={product.gallery[0]}
                  />
                  <div style={{ lineHeight: "28.8px", color: "black" }}>
                    {product.brand} {product.name}
                  </div>
                  <div style={{ color: "black" }}>
                    {currencyLabel[this.props.currency]} {price.amount}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const categoryQuery = gql`
  query Category {
    category(input: { title: "tech" }) {
      name
      products {
        id
        name
        gallery
        brand
        inStock
        attributes {
          id
          name
          items {
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;

const currencyQuery = gql`
  query {
    currencies
  }
`;

const amountQuery = gql`
  query Product($id: String!) {
    product(id: $id) {
      prices {
        currency
        amount
      }
    }
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    currency: state.currency,
  };
};

export default compose(
  connect(mapStateToProps),
  graphql(amountQuery as any) as any,
  graphql(currencyQuery as any) as any,
  graphql(categoryQuery as any) as any
)(CategoryPage as any);
