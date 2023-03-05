import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { store } from "../store";
import { AppState } from "../reducer";
import { compose } from "recompose";
import { connect } from "react-redux";
import styles from "./Currencies.module.css";
import { Currency } from "../graphql/types";
import { ReactComponent as CurrencyIcon } from "./assets/currency.svg";
import { ReactComponent as ArrowDownIcon } from "./assets/arrow-down.svg";
import { ReactComponent as ArrowUpIcon } from "./assets/arrow-up.svg";
import { currencyLabel } from "../utils";

type OwnProps = {};

type GraphQLProps = {
  data: CurrencyQueryResult;
};

type CurrencyQueryResult = {
  loading: boolean;
  currencies: Currency[];
};

type StoreProps = {
  currency: AppState["currency"];
};

type Props = OwnProps & StoreProps & GraphQLProps;

type State = { visibility: boolean };

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
    return (
      <>
        <div
          className={styles["currency"]}
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <div className={styles["currency-symbol"]}>
            {currencyLabel[this.props.currency]}
          </div>
          {this.state.visibility ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </div>
        {this.state.visibility && (
          <div className={styles["currency-popup"]}>
            <div className={styles["currencies"]}>
              {currencies.map((currency) => (
                <div
                  key={currency.label}
                  className={`
                    ${styles["currency-item"]}
                    ${
                      currency.label === this.props.currency &&
                      styles["currency-current"]
                    }
                  `}
                  onClick={() => {
                    currency.label !== this.props.currency &&
                      this.changeCurrency(currency.label);
                  }}
                >
                  <div className={styles["currency-item"]}>
                    {currency.symbol} {currency.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

const currencyQuery = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    currency: state.currency,
  };
};

export default compose<Props, OwnProps>(
  connect(mapStateToProps),
  graphql(currencyQuery)
)(Currencies);
