import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { AppState } from "../reducer";

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};
type OwnProps = {};
type Props = OwnProps & StoreProps;

type State = {
  visibility: boolean;
};

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibility: false,
    };
  }

  render() {
    return (
      <div>
        <button
          style={{ marginTop: "28px", border: "transparent" }}
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <img
            style={{
              width: 24,
              height: 16,
            }}
            src="https://w7.pngwing.com/pngs/225/984/png-transparent-computer-icons-shopping-cart-encapsulated-postscript-shopping-cart-angle-black-shopping.png"
            alt="IconCart"
          />
        </button>
        {this.state.visibility ? (
          <div
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              width: 150,
              height: 200,
              border: "1px solid red",
              display: "flex", // to hide use "none"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.props.cartItems.map((item) => {
                return (
                  <div key={item.id}>
                    {item.id} {this.props.currency}
                  </div>
                );
              })}
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
  connect<StoreProps, {}, OwnProps>(mapStateToProps as any)
)(Cart as any);
