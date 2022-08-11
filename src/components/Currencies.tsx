import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import store from "../store";
import { AppState } from "../reducer";
import { compose } from "recompose";
import { connect } from "react-redux";
import { currencyLabel } from "../utils";

type Props = OwnProps & StoreProps;
type State = { visibility: boolean };

type OwnProps = {
  data: CurrencyQueryResult;
};

type CurrencyQueryResult = {
  loading: boolean;
  currencies: AppState["currency"][];
};

type StoreProps = {
  currency: AppState["currency"];
};

class Currencies extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibility: false,
    };
  }

  changeCurrency = (currency: AppState["currency"]) => {
    store.dispatch({
      type: "SET_CURRENCY",
      payload: { currency },
    });
  };

  render() {
    const { currencies } = this.props.data;
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginTop: "28px",
            width: "12px",
            height: "29px",
            // backgroundColor: "red",
            display: "flex",
            alignItems: "center",
          }}
        >
          {currencyLabel[this.props.currency]}
        </div>
        <div
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          {this.state.visibility ? (
            <div
              style={{
                marginTop: "44px",
                marginLeft: "10px",
                backgroundColor: "white",
                border: "solid black",
                borderWidth: "0 1px 1px 0",
                display: "inline-block",
                padding: "2.5px",
                transform: "rotate(-135deg)",
              }}
            ></div>
          ) : (
            <div
              style={{
                marginTop: "44px",
                marginLeft: "10px",
                backgroundColor: "white",
                border: "solid black",
                borderWidth: "0 1px 1px 0",
                display: "inline-block",
                padding: "2.5px",
                transform: "rotate(45deg)",
              }}
            ></div>
          )}
        </div>
        {this.state.visibility ? (
          <div
            style={{
              position: "absolute",
              top: 50,
              right: 110,
              width: 120,
              height: 190,
              border: "1px solid red",
              display: "flex", // to hide use "none"
            }}
          >
            <div>
              {currencies.map((currency) => (
                <ul key={currency}>
                  <div
                    style={
                      currency === this.props.currency
                        ? { background: "#EEEEEE" }
                        : {}
                    }
                    key={currency}
                    onClick={() => {
                      currency !== this.props.currency &&
                        this.changeCurrency(currency);
                    }}
                  >
                    {currencyLabel[currency]}
                    {currency}
                  </div>
                </ul>
              ))}
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

const currencyQuery = gql`
  query {
    currencies
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    currency: state.currency,
  };
};

export default compose(
  connect(mapStateToProps),
  graphql(currencyQuery as any) as any
)(Currencies as any);
