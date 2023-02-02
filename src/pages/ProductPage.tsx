import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { compose } from "recompose";
import { store } from "../store";
import { withParams } from "../utils";
import { AppState, updateAttributes } from "../reducer";
import { connect } from "react-redux";
import { currencyLabel } from "../utils";
import ProductAttributes from "../components/ProductAttributes";
import styles from "./ProductPage.module.css";
import { getPrice } from "../components/CartPage.utils";
import { Product } from "../graphql/types";

export type SelectedAttributeValues = { [key: string]: string };

type OwnProps = {
  // place: "PAGE" | "POPUP";
};

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};

type NavigationProps = {
  params: { id: Product["id"] };
};

type State = {
  visibility: boolean;
  selectedAttributeValues: SelectedAttributeValues;
  selectedImage?: string;
};

type ProductQueryResult = {
  loading: boolean;
  product: Product;
};

type GraphQLProps = {
  data: ProductQueryResult;
};

type Props = OwnProps & StoreProps & NavigationProps & GraphQLProps;

class ProductPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visibility: false,
      selectedAttributeValues: {}, // Внутреннее состояние атрибутов продукта
    };
  }

  addProductToCart = () => {
    // Добавляет продукт в корзину
    store.dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        product: this.props.data.product,
        selectedAttributeValues: this.state.selectedAttributeValues,
      },
    });
  };

  deleteProductFromCart = () => {
    // Удаляет продукт из корзины
    store.dispatch({
      type: "CART_REMOVE_ITEM",
      payload: {
        product: this.props.data.product,
      },
    });
  };

  getProductAttributes = (attributes: Product["attributes"]) => {
    const { selectedAttributeValues } = this.state;
    // console.log("getProductAttributes", selectedAttributeValues);
    return updateAttributes(attributes, selectedAttributeValues); // updateAttributes берём из reducer, возвращает атрибут с isSelected true или false
  };

  setProductPageAttributeValue = (
    attributeId: string,
    attributeValueId: string
  ) => {
    const { selectedAttributeValues } = this.state;
    selectedAttributeValues[attributeId] = attributeValueId;
    this.setState({
      selectedAttributeValues,
    });

    // console.log(
    //   "setProductPageAttributeValue",
    //   attributeId,
    //   attributeValueId,
    //   selectedAttributeValues
    // );
  };

  renderImageGallery = () => {
    const { product } = this.props.data;
    return (
      <div className={styles["gallery-section"]}>
        {product.gallery.map((image) => {
          return (
            <div
              onClick={() => {
                this.setState({ selectedImage: image });
              }}
              className={styles["gallery-block"]}
              key={image}
            >
              <img className={styles["gallery-images"]} src={image} alt="" />
            </div>
          );
        })}
      </div>
    );
  };

  renderImage = () => {
    return (
      <div className={styles["product-image-block"]}>
        <img
          className={styles["product-image"]}
          alt=""
          src={this.state.selectedImage || this.props.data.product.gallery[0]}
        />
      </div>
    );
  };

  render() {
    const { loading, product } = this.props.data;
    const { currency } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    const inCart = this.props.cartItems
      .map((item) => item.id)
      .includes(product.id); //  Проходимся по cartItems и если в нём есть product.id, возвращаем true.
    const cartButtonTitle = inCart ? "REMOVE" : "ADD TO CART"; // В зависимости true или false в inCart, cartButtonTitle показывает "REMOVE" или "ADD TO CART"
    const cartButtonCallback = inCart //  эта функция отрабатывает при клике на кнопку
      ? this.deleteProductFromCart
      : this.addProductToCart;

    const price = getPrice(product.prices, currency);

    const filteredCartItems = this.props.cartItems.filter((cartItem) => {
      return product.id === cartItem.id;
    });

    // console.log("filteredCartItems", filteredCartItems);

    const cartItem =
      filteredCartItems.length === 0 ? null : filteredCartItems[0];

    // console.log("cartItem", cartItem);

    // const numbers = [1, 2, 3];
    // const two = numbers.filter((number) => number === 2);
    // console.log(two[0]);

    // console.log("ProductPage", product.attributes);
    // console.log("inCart", inCart);
    const attributes = this.getProductAttributes(
      cartItem ? cartItem.attributes : product.attributes
    );
    return (
      <div className={styles["product"]}>
        {this.renderImageGallery()}
        {this.renderImage()}

        <div className={styles["product-info-section"]}>
          <div>
            <div className={styles["product-brand"]}>{product.brand}</div>
            <div className={styles["product-name"]}>{product.name}</div>
          </div>

          <ProductAttributes
            productId={product.id}
            attributes={attributes}
            place="PRODUCT"
            setProductPageAttributeValue={this.setProductPageAttributeValue}
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

export default compose<Props, OwnProps>(
  withParams,
  graphql(currencyQuery),
  graphql(productQuery, productQueryOptions),
  connect(mapStateToProps)
)(ProductPage);
