import React from "react";
import { AppState } from "../reducer";
import { store } from "../store";
import { getPrice } from "../pages/ProductPage";
import { currencyLabel } from "../utils";
import { compose } from "recompose";
import { withParams } from "../utils";
import { connect } from "react-redux";
import ProductAttributes from "./ProductAttributes";
import styles from "./Cart.module.css";

type Props = OwnProps & StoreProps;

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};
type OwnProps = {
  params: { id: Product["id"] };
  data: CartQueryResult;
  place: "PAGE" | "POPUP";
};

type CartQueryResult = {
  product: Product;
};

type Product = {
  id: string;
  name: string;
  description: string;
  prices: Price[];
};

type Price = {
  currency: AppState["currency"];
  amount: number;
  quantity: number;
};
type State = {};

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  incrementItem = (product: any) => {
    store.dispatch({
      type: "CART_INCREMENT_ITEM",
      payload: { product },
    });
  };
  decrementItem = (product: any) => {
    store.dispatch({
      type: "CART_DECREMENT_ITEM",
      payload: { product },
    });
  };

  render() {
    const { currency, place, params } = this.props;
    console.log(params);
    return (
      <>
        {this.props.cartItems.map((cartItem) => {
          const price = getPrice(cartItem.prices, currency);
          if (place === "POPUP") {
            return (
              <>
                <div className={styles["popup-product"]}>
                  <div
                    className={styles["popup-product-info"]}
                    key={cartItem.id}
                  >
                    <div className={styles["popup-brand-name"]}>
                      <div className={styles["popup-brand"]}>
                        {cartItem.brand}
                      </div>
                      <div className={styles["popup-name"]}>
                        {cartItem.name}
                      </div>
                    </div>
                    <div className={styles["popup-currency-price"]}>
                      {currencyLabel[this.props.currency]}
                      {price.amount}
                    </div>
                    <div>
                      <ProductAttributes
                        productId={cartItem.name}
                        attributes={cartItem.attributes}
                        place={place}
                      />
                    </div>
                  </div>

                  <div className={styles["popup-quantity-image"]}>
                    <div className={styles["popup-quantity-section"]}>
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
              </>
            );
          }

          if (place === "PAGE") {
            return (
              <>
                <div className={styles["borders"]}>
                  <div className={styles["page-product"]}>
                    <div
                      className={styles["page-product-info"]}
                      key={cartItem.id}
                    >
                      <div className={styles["page-brand-name"]}>
                        <div className={styles["page-brand"]}>
                          {cartItem.brand}
                        </div>
                        <div className={styles["page-name"]}>
                          {cartItem.name}
                        </div>
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
                          src={cartItem.gallery[0]}
                        />
                      </div>
                      <div className={styles["switcher"]}>
                        <div className={styles["switcher-left"]}>
                          <div className={styles["vector-left"]}></div>
                        </div>
                        <div className={styles["switcher-right"]}>
                          <div className={styles["vector-right"]}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className={styles["delimiter"]}></hr>
                </div>
              </>
            );
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

export default compose(
  withParams,
  connect<StoreProps, {}, OwnProps>(mapStateToProps as any)
)(Cart as any) as any;
