import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { getPrice } from "../pages/ProductPage";
import { withParams } from "../utils";
import { Link } from "react-router-dom";
import { currencyLabel } from "../utils";
import Cart from "./Cart";
import styles from "./CartPopup.module.css";

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
  attributes: Attribute[];
};

type Price = {
  currency: AppState["currency"];
  amount: number;
  quantity: number;
};

type Attribute = {
  id: string;
  name: string;
  items: Item[];
  type: string;
};

type Item = {
  displayValue: string;
  id: string;
  colorProduct: string;
};

type State = {
  visibility: boolean;
};

class CartPopup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibility: false,
    };
  }

  render() {
    const { currency } = this.props;
    let itemsInCart = this.props.cartItems.reduce((sum, item) => {
      const quantity = 1;
      return sum + quantity;
    }, 0);
    const total = this.props.cartItems.reduce((sum, item) => {
      const price = getPrice(item.prices, currency); // price on 1 item
      return sum + price.amount * item.quantity;
    }, 0);

    return (
      <div>
        <div
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <div className={styles["cart-icon-section"]}>
            <div className={styles["cart-icon-block"]}>
              <div className={styles["vector"]}></div>

              <div className={styles["trapezoid"]}></div>

              <div className={styles["circle-section"]}>
                <div className={styles["circle"]}></div>

                <div className={styles["circle"]}></div>
              </div>
            </div>
          </div>
        </div>

        {itemsInCart >= 1 ? (
          <div className={styles["items-in-cart"]}>{itemsInCart}</div>
        ) : (
          ""
        )}

        {this.state.visibility ? (
          <div className={styles["cart-popup"]}>
            <div className={styles["popup-section"]}>
              <div className={styles["popup-title-quantity"]}>
                <div className={styles["popup-title"]}>My Bag,</div>
                <div className={styles["popup-quantity"]}>
                  {itemsInCart} items
                </div>
              </div>

              <div
                style={{
                  maxHeight: "446px",
                  overflow: "auto",
                  // backgroundColor: "yellow",
                }}
              >
                <Cart place="POPUP" />
              </div>

              <div className={styles["popup-total-section"]}>
                <div className={styles["popup-total-title"]}>Total</div>
                <div className={styles["popup-currency-total"]}>
                  {currencyLabel[this.props.currency]} {total.toFixed(2)}
                </div>
              </div>

              <div className={styles["popup-buttons-section"]}>
                <Link className={styles["link"]} to={`/cart`}>
                  <div className={styles["button-view-bag"]}>
                    <div className={styles["title-view-bag"]}>VIEW BAG</div>
                  </div>
                </Link>
                <Link className={styles["link"]} to={`/`}>
                  <div className={styles["button-check-out"]}>
                    <div className={styles["title-check-out"]}>CHECK OUT</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </div>
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
)(CartPopup as any) as any;
