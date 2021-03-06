import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { compose } from "recompose";
import store from "../store";
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
          paddingLeft: "100px",
          paddingRight: "100px",
          marginTop: "73px",
          flexDirection: "row",
          display: "flex",
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
                    width: 97,
                    height: 87,
                    // border: "1px solid lightGray",
                    marginBottom: 30,
                  }}
                />
              </div>
            );
          })}
        </div>

        <img
          alt=""
          style={{
            width: "500px",
            height: "460px",
            border: "1px solid lightGray",
            marginLeft: 20,
          }}
          src={product.gallery[0]}
          // src={photo}
        />

        <div
          style={{
            marginLeft: 70,
            // backgroundColor: "yellow",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div>
            <h3 style={{ margin: 0, lineHeight: "27px" }}>{product.brand}</h3>
            <big>{product.name}</big>
          </div>

          <ProductAttributes attributes={product.attributes} place="PAGE" />

          <div>
            <p>PRICE:</p>
            <p>
              {currencyLabel[price.currency]} {price.amount}
            </p>
            <button
              onClick={cartButtonCallback}
              style={{
                height: 52,
                width: 292,
                backgroundColor: "#5ECE7B",
              }}
            >
              {cartButtonTitle}
            </button>
          </div>
          <div style={{ width: 292 }}>
            <p>{product.description}</p>
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
          displayValue
          id
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
