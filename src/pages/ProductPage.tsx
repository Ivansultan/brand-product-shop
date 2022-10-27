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
import styles from "./ProductPage.module.css";

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
      <div className={styles["product"]}>
        <div className={styles["gallery-section"]}>
          {product.gallery.map((image) => {
            return (
              <div className={styles["gallery-block"]} key={image}>
                <img className={styles["gallery-images"]} src={image} alt="" />
              </div>
            );
          })}
        </div>

        <div className={styles["product-image-block"]}>
          <img
            className={styles["product-image"]}
            alt=""
            src={product.gallery[0]}
          />
        </div>

        <div className={styles["product-info-section"]}>
          <div>
            <div className={styles["product-brand"]}>{product.brand}</div>
            <div className={styles["product-name"]}>{product.name}</div>
          </div>

          <ProductAttributes
            attributes={product.attributes}
            place="PAGE"
            productId={product.id}
          />

          <div>
            <div className={styles["product-price-title"]}>PRICE:</div>
            <div className={styles["product-currency-price"]}>
              {currencyLabel[price.currency]}
              {price.amount}
            </div>
            <div
              className={styles["product-button"]}
              onClick={cartButtonCallback}
            >
              {cartButtonTitle}
            </div>
          </div>
          <div
            className={styles["product-description"]}
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
