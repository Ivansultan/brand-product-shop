import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";
import { getPrice } from "../pages/ProductPage";
import { withParams } from "../utils";
import { Link } from "react-router-dom";
import { currencyLabel } from "../utils";
import Cart from "./Cart";

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
          style={
            {
              // border: "transparent",
            }
          }
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          {/* <img
            style={{
              width: 16,
              height: 16,
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH6xTvUOEaGNvhxL2HaGfdzcwafH1bVCHzWQ&amp;usqp=CAU"
            alt="IconCart"
          /> */}
          <div
            style={{
              position: "relative",
              float: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginLeft: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  top: "4px",
                  left: "4.05px",
                  marginRight: "25px",
                  backgroundColor: "#FFFFFF",
                  border: "solid #2B2B2B",
                  borderWidth: "0 1px 1px 0",
                  display: "inline-block",
                  padding: "2px",
                  transform: "rotate(-105deg)",
                  borderRadius: "1.5px",
                }}
              ></div>

              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#FFFFFF",
                  borderTop: "1px solid #2B2B2B",
                  borderBottom: "2px solid #2B2B2B",
                  borderLeft: "1px solid #2B2B2B",
                  borderRight: "1px solid #2B2B2B",
                  margin: "auto",
                  transform: "perspective(30px) rotateX(-45deg)",
                  borderRadius: "2px",
                }}
              ></div>

              <div
                style={{
                  position: "relative",
                  bottom: "2px",
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  justifyContent: "space-around",
                  // backgroundColor: "red",
                }}
              >
                <div
                  style={{
                    width: "2px",
                    height: "2px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "4px",
                    border: "1.1px solid #2B2B2B",
                  }}
                ></div>

                <div
                  style={{
                    width: "2px",
                    height: "2spx",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "4px",
                    border: "1.1px solid #2B2B2B",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {itemsInCart >= 1 ? (
          <div
            style={{
              position: "relative",
              bottom: "27px",
              left: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "18px",
              height: "18px",
              backgroundColor: "black",
              borderRadius: "9px",
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {itemsInCart}
          </div>
        ) : (
          ""
        )}

        {this.state.visibility ? (
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 72,
              width: "325px",
              maxHeight: "677px",
              border: "0.1px solid lightgray",
              display: "flex", // to hide use "none"
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                // backgroundColor: "orange",
                marginTop: "32px",
                marginRight: "16px",
                marginBottom: "32px",
                marginLeft: "16px",
              }}
            >
              <div
                style={{
                  // backgroundColor: "red",
                  display: "flex",
                  flexDirection: "row",
                  // marginBottom: "32px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "16px" }}>My Bag,</div>
                <div style={{ marginLeft: "5px", fontSize: "16px" }}>
                  {itemsInCart} items
                </div>
              </div>

              <div>
                <Cart place="POPUP" />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "41px",
                  marginBottom: "32px",
                  // backgroundColor: "yellow",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: 500 }}>Total</div>
                <div style={{ fontSize: "16px", fontWeight: 700 }}>
                  {currencyLabel[this.props.currency]} {total}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Link to={`/cart`}>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      width: "140px",
                      height: "43px",
                      border: "1px solid #1D1F22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#1D1F22",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      VIEW BAG
                    </div>
                  </div>
                </Link>
                <Link to={`/`}>
                  <div
                    style={{
                      backgroundColor: "#5ECE7B",
                      width: "140px",
                      height: "43px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      CHECK OUT
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "none",
            }}
          ></div>
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
