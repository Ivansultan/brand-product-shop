import React from "react";
import { AppState } from "../reducer";
import { getPrice } from "./CartPage.utils";
import { Link } from "react-router-dom";
import { currencyLabel, withParams } from "../utils";
import Cart from "./Cart";
import styles from "./CartPopup.module.css";
import { Product } from "../graphql/types";
import { compose } from "recompose";
import { connect } from "react-redux";

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
  isVisible: boolean;
};

class CartPopup extends React.Component<Props, State> {
  private node: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleOutsideClick = (e: any) => {
    if (!this.node.contains(e.target)) {
      this.handleClick();
    }
  };

  handleClick = () => {
    if (!this.state.isVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  };

  renderCartIconWithCount = (itemsInCart: number) => {
    return (
      <>
        <div>
          <div
            onClick={this.handleClick}
            className={styles["cart-icon-section"]}
          >
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
          <div onClick={this.handleClick} className={styles["items-in-cart"]}>
            {itemsInCart}
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  render() {
    const { currency } = this.props;
    const total = this.props.cartItems.reduce((sum, item) => {
      const price = getPrice(item.prices, currency); // price on 1 item
      return sum + price.amount * item.quantity;
    }, 0);
    const itemsInCart = this.props.cartItems.reduce((sum, item) => {
      const quantity = 1;
      return sum + quantity;
    }, 0);
    return (
      <>
        {this.state.isVisible && <div className={styles["overlay"]} />}
        <div
          ref={(node) => {
            this.node = node;
          }}
        >
          {this.renderCartIconWithCount(itemsInCart)}

          {this.state.isVisible && (
            <>
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
                    <Link
                      className={styles["link"]}
                      to={`/cart`}
                      onClick={this.handleClick}
                    >
                      <div className={styles["button-view-bag"]}>
                        <div className={styles["title-view-bag"]}>VIEW BAG</div>
                      </div>
                    </Link>
                    <div
                      className={styles["button-check-out"]}
                      onClick={() => alert("Coming soon")}
                    >
                      <div className={styles["title-check-out"]}>CHECK OUT</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
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
)(CartPopup);
