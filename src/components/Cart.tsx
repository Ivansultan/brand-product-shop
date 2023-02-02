import React from "react";
import { AppState, CartProduct } from "../reducer";
import { store } from "../store";
import { getPrice } from "./CartPage.utils";
import { currencyLabel } from "../utils";
import { compose } from "recompose";
import { withParams } from "../utils";
import { connect } from "react-redux";
import ProductAttributes from "./ProductAttributes";
import styles from "./Cart.module.css";
import { Product } from "../graphql/types";

type OwnProps = {
  place: "PAGE" | "POPUP";
};

type NavigationProps = {
  params: { id: Product["id"] };
};

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};

type CartQueryResult = {
  product: Product;
};

type GraphQLProps = {
  data: CartQueryResult;
};

type Props = OwnProps & NavigationProps & StoreProps & GraphQLProps;

type State = {
  selectedImageByProductId: { [id: CartProduct["id"]]: number };
};

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedImageByProductId: {},
    };
  }

  incrementItem = (product: CartProduct) => {
    store.dispatch({
      type: "CART_INCREMENT_ITEM",
      payload: { product },
    });
  };
  decrementItem = (product: CartProduct) => {
    store.dispatch({
      type: "CART_DECREMENT_ITEM",
      payload: { product },
    });
  };

  canSwitchProductImage = (product: CartProduct, isNext: boolean) => {
    const currentImageIndex =
      this.state.selectedImageByProductId[product.id] || 0;

    return isNext
      ? currentImageIndex !== product.gallery.length - 1
      : currentImageIndex > 0;
  };

  switchProductImage = (product: CartProduct, isNext: boolean) => {
    const currentImageIndex =
      this.state.selectedImageByProductId[product.id] || 0;

    if (!this.canSwitchProductImage(product, isNext)) {
      return;
    }

    const selectedImageByProductId = {
      ...this.state.selectedImageByProductId,
    };
    selectedImageByProductId[product.id] =
      currentImageIndex + (isNext ? 1 : -1);
    console.log(selectedImageByProductId);
    this.setState({
      selectedImageByProductId,
    });
  };

  render() {
    const { currency, place } = this.props;
    return (
      <>
        {this.props.cartItems.map((cartItem) => {
          const price = getPrice(cartItem.prices, currency);
          if (place === "POPUP") {
            return (
              <div
                className={styles["popup-product"]}
                key={cartItem.id} // Уникальный ключ для родительского блока
              >
                <div className={styles["popup-product-info"]}>
                  <div className={styles["popup-brand-name"]}>
                    <div className={styles["popup-brand"]}>
                      {cartItem.brand}
                    </div>
                    <div className={styles["popup-name"]}>{cartItem.name}</div>
                  </div>
                  <div className={styles["popup-currency-price"]}>
                    {currencyLabel[this.props.currency]}
                    {price.amount}
                  </div>
                  <div>
                    <ProductAttributes
                      productId={cartItem.id}
                      attributes={cartItem.attributes}
                      place={place}
                    />
                  </div>
                </div>

                <div className={styles["popup-quantity-section"]}>
                  <div className={styles["popup-quantity-block"]}>
                    <div
                      className={styles["popup-increment"]}
                      onClick={() => this.incrementItem(cartItem)}
                    >
                      +
                    </div>

                    <div className={styles["popup-quantity"]}>
                      {cartItem.quantity}
                    </div>

                    <div
                      className={
                        cartItem.quantity > 1
                          ? styles["popup-decrement"]
                          : styles["popup-decrement-default"]
                      }
                      onClick={() => {
                        if (cartItem.quantity > 1) {
                          this.decrementItem(cartItem);
                        }
                      }}
                    >
                      -
                    </div>
                  </div>

                  <div className={styles["popup-image-section"]}>
                    <img
                      className={styles["popup-image"]}
                      alt=""
                      src={cartItem.gallery[0]}
                    />
                  </div>
                </div>
              </div>
            );
          }

          if (place === "PAGE") {
            return (
              <div
                className={styles["borders"]}
                key={`${cartItem.id}`} // Уникальный ключ не похожий в первом блоке
              >
                <div className={styles["page-product"]}>
                  <div
                    className={styles["page-product-info"]}
                    key={cartItem.id}
                  >
                    <div className={styles["page-brand-name"]}>
                      <div className={styles["page-brand"]}>
                        {cartItem.brand}
                      </div>
                      <div className={styles["page-name"]}>{cartItem.name}</div>
                    </div>
                    <div className={styles["page-currency-price"]}>
                      {currencyLabel[this.props.currency]}
                      {price.amount}
                    </div>
                    <div>
                      <ProductAttributes
                        productId={cartItem.id}
                        attributes={cartItem.attributes}
                        place={place}
                      />
                    </div>
                  </div>

                  <div className={styles["page-quantity-section"]}>
                    <div className={styles["page-quantity-block"]}>
                      <div
                        className={styles["page-increment"]}
                        onClick={() => this.incrementItem(cartItem)}
                      >
                        +
                      </div>

                      <div className={styles["page-quantity"]}>
                        {cartItem.quantity}
                      </div>

                      <div
                        className={
                          cartItem.quantity > 1
                            ? styles["page-decrement"]
                            : styles["page-decrement-default"]
                        }
                        onClick={() => {
                          if (cartItem.quantity > 1) {
                            this.decrementItem(cartItem);
                          }
                        }}
                      >
                        -
                      </div>
                    </div>

                    <div className={styles["page-image-section"]}>
                      <img
                        className={styles["page-image"]}
                        alt=""
                        src={
                          cartItem.gallery[
                            this.state.selectedImageByProductId[cartItem.id] ||
                              0
                          ]
                        }
                      />
                    </div>
                    <div className={styles["switcher"]}>
                      <div
                        onClick={() => this.switchProductImage(cartItem, false)}
                        style={{
                          visibility: this.canSwitchProductImage(
                            cartItem,
                            false
                          )
                            ? "visible"
                            : "hidden",
                        }}
                        className={styles["switcher-left"]}
                      >
                        <div className={styles["vector-left"]}></div>
                      </div>
                      <div
                        onClick={() => this.switchProductImage(cartItem, true)}
                        style={{
                          visibility: this.canSwitchProductImage(cartItem, true)
                            ? "visible"
                            : "hidden",
                        }}
                        className={styles["switcher-right"]}
                      >
                        <div className={styles["vector-right"]}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className={styles["delimiter"]}></hr>
              </div>
            );
          } else {
            return <div></div>;
          }
        })}
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    cartItems: state.cartItems,
    currency: state.currency,
  };
};

export default compose<Props, OwnProps>(
  withParams,
  connect(mapStateToProps)
)(Cart);
