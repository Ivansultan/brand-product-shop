import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { compose } from "recompose";
import { store } from "../store";
import { withParams } from "../utils";
import { AppState } from "../reducer";
import { connect } from "react-redux";
import { currencyLabel } from "../utils";
import ProductAttributes, { Attribute } from "../components/ProductAttributes";

export const getPrice = (
  prices: Price[],
  currency: AppState["currency"]
): Price => {
  return prices.filter((item) => item.currency === currency)[0];
};

// const getImage = (gallery: Image[]): Image => {
//   return gallery.filter((item) => item)[0];
// };

type State = {
  visibility: boolean;
};

type Price = {
  currency: AppState["currency"];
  amount: number; // price for 1 item
};

type Image = string;

export type Product = {
  id: string;
  brand: string;
  name: string;
  description: string;
  prices: Price[];
  gallery: Image[];
  attributes: Attribute[];
};

// const processImage = (image: Image) => {

// }

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
  // place: "PAGE" | "POPUP";
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
    const cartButtonTitle = inCart ? "REMOVE" : "ADD TO CART";
    const cartButtonCallback = inCart
      ? this.deleteProductFromCart
      : this.addProductToCart;

    const price = getPrice(product.prices, currency);

    return (
      <div
        style={{
          marginLeft: "97px",
          marginRight: "219px",
          marginTop: "73px",
          flexDirection: "row",
          display: "flex",
          // backgroundColor: "yellow",
        }}
      >
        <div style={{ flexDirection: "column", display: "flex" }}>
          {product.gallery.map((image) => {
            return (
              <div
                key={image}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid transparent",
                  cursor: "pointer",
                }}
              >
                <img
                  src={image}
                  alt=""
                  style={{
                    maxWidth: 79,
                    height: 80,
                    border: "1px solid lightGray",
                    marginBottom: 32,
                  }}
                />
              </div>
            );
          })}
        </div>

        <img
          alt=""
          style={{
            maxWidth: "610px",
            height: "511px",
            border: "1px solid lightGray",
            marginLeft: "35px",
          }}
          src={product.gallery[0]}
          // src={photo}
        />

        <div
          style={{
            marginLeft: 100,
            flexDirection: "column",
            display: "flex",
            // backgroundColor: "gray",
          }}
        >
          <div>
            <div
              style={{
                // margin: 0,
                lineHeight: "27px",
                fontSize: "30px",
                fontWeight: 600,
              }}
            >
              {product.brand}
            </div>
            <div
              style={{ marginTop: "16px", fontSize: "30px", fontWeight: 400 }}
            >
              {product.name}
            </div>
          </div>

          <ProductAttributes attributes={product.attributes} place="PAGE" />

          <div>
            <div
              style={{
                marginTop: "36px",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "18px",
              }}
            >
              PRICE:
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "18px",
                marginTop: "10px",
              }}
            >
              {currencyLabel[price.currency]}
              {price.amount}
            </div>
            <div
              onClick={cartButtonCallback}
              style={{
                cursor: "pointer",
                marginTop: "20px",
                height: "52px",
                width: "292px",
                backgroundColor: "#5ECE7B",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cartButtonTitle}
            </div>
          </div>
          <div
            style={{ width: "292px", marginTop: "40px" }}
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
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
      inStock
      gallery
      description
      category
      brand
      attributes {
        id
        name
        type
        items {
          id
          displayValue
        }
      }
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
