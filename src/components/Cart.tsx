import React from "react";
import { AppState } from "../reducer";
import { store } from "../store";
import { getPrice } from "../pages/ProductPage";
import { currencyLabel } from "../utils";
import { compose } from "recompose";
import { withParams } from "../utils";
import { connect } from "react-redux";
import ProductAttributes from "./ProductAttributes";

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
    const { currency, place } = this.props;

    return (
      <>
        {this.props.cartItems.map((cartItem) => {
          const price = getPrice(cartItem.prices, currency);
          if (place === "POPUP") {
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "32px",
                    // paddingTop: "24px",
                    // backgroundColor: "yellow",
                  }}
                >
                  <div
                    style={{
                      width: "136px",
                    }}
                    key={cartItem.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "25.6px",
                      }}
                    >
                      <div
                        style={{
                          color: "#1D1F22",
                          fontSize: "16px",
                          fontWeight: 300,
                        }}
                      >
                        {cartItem.brand}
                      </div>
                      <div
                        style={{
                          color: "#1D1F22",
                          fontSize: "16px",
                          fontWeight: 300,
                        }}
                      >
                        {cartItem.name}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                        fontWeight: 500,
                        height: "26px",
                      }}
                    >
                      {currencyLabel[this.props.currency]}
                      {price.amount}
                    </div>
                    <div>
                      <ProductAttributes
                        attributes={cartItem.attributes}
                        place={place}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          cursor: "pointer",
                          border: "1px solid black",
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={() => this.incrementItem(cartItem)}
                      >
                        +
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        {cartItem.quantity}
                      </div>

                      <div
                        style={
                          cartItem.quantity > 1
                            ? {
                                display: "flex",
                                justifyContent: "center",
                                cursor: "pointer",
                                border: "1px solid black",
                                width: "24px",
                                height: "24px",
                              }
                            : {
                                display: "flex",
                                justifyContent: "center",
                                border: "1px solid black",
                                width: "24px",
                                height: "24px",
                              }
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

                    <div
                      style={{
                        border: "0.5px solid lightGray",
                        marginLeft: "8px",
                        width: "121px",
                        height: "190px",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        alt=""
                        style={{ maxWidth: "121px", maxHeight: "190px" }}
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
                <div style={{ marginLeft: "100px", marginRight: "100px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: "24px",
                      paddingBottom: "24px",
                      marginTop: "-8px",
                    }}
                  >
                    <div
                      style={{
                        width: "292px",
                      }}
                      key={cartItem.id}
                    >
                      <div
                        style={{
                          flexDirection: "column",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            color: "#1D1F22",
                            fontSize: "30px",
                            fontWeight: 600,
                            lineHeight: "27px",
                          }}
                        >
                          {cartItem.brand}
                        </div>
                        <div
                          style={{
                            marginTop: "16px",
                            fontSize: "30px",
                            fontWeight: 400,
                            lineHeight: "27px",
                          }}
                        >
                          {cartItem.name}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                          fontSize: "24px",
                          fontWeight: 700,
                          lineHeight: "24px",
                          // height: "26px",
                        }}
                      >
                        {currencyLabel[this.props.currency]}
                        {price.amount}
                      </div>
                      <div>
                        <ProductAttributes
                          attributes={cartItem.attributes}
                          place={place}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px solid black",
                            width: "24px",
                            height: "24px",
                          }}
                          onClick={() => this.incrementItem(cartItem)}
                        >
                          +
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                          }}
                        >
                          {cartItem.quantity}
                        </div>

                        <div
                          style={
                            cartItem.quantity > 1
                              ? {
                                  display: "flex",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                  border: "1px solid black",
                                  width: "24px",
                                  height: "24px",
                                }
                              : {
                                  display: "flex",
                                  justifyContent: "center",
                                  border: "1px solid black",
                                  width: "24px",
                                  height: "24px",
                                }
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

                      <div
                        style={{
                          border: "0.5px solid lightGray",
                          marginLeft: "24px",
                          width: "200px",
                          height: "288px",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <img
                          alt=""
                          style={{ maxWidth: "200px", maxHeight: "288px" }}
                          src={cartItem.gallery[0]}
                        />
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "0.1px solid lightGray",
                      marginTop: "-1px",
                    }}
                  ></hr>
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
