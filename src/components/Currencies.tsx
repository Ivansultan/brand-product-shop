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
    const { loading, currencies } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {currencyLabel[this.props.currency]}
        <button
          style={{ border: "transparent" }}
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <img
            style={{ width: 10, height: 8, backgroundColor: "white" }}
            src="https://www.vhv.rs/dpng/d/172-1725836_drop-down-arrow-images-dropdown-icon-png-transparent.png"
            alt="DropdownIcon"
          />
        </button>
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
                  <button
                    style={
                      currency === this.props.currency
                        ? { background: "yellow" }
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
                  </button>
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
