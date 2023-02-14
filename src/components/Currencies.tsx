import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { store } from "../store";
import { AppState } from "../reducer";
import { compose } from "recompose";
import { connect } from "react-redux";
import { currencyLabel } from "../utils";
import styles from "./Currencies.module.css";

type OwnProps = {};

type GraphQLProps = {
  data: CurrencyQueryResult;
};

type CurrencyQueryResult = {
  loading: boolean;
  currencies: AppState["currency"][];
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
      <div className={styles["currency-icon-vector"]}>
        <div className={styles["currency-icon"]}>
          {currencyLabel[this.props.currency]}
        </div>
        <div
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          {this.state.visibility ? (
            <div className={styles["vector-up"]}></div>
          ) : (
            <div className={styles["vector-down"]}></div>
          )}
        </div>
        {this.state.visibility ? (
          <div className={styles["currency-popup"]}>
            {currencies.map((currency) => (
              <div className={styles["currency-section"]} key={currency}>
                <div
                  className={
                    currency === this.props.currency
                      ? styles["currency-current"]
                      : styles["currency-expected"]
                  }
                  key={currency}
                  onClick={() => {
                    currency !== this.props.currency &&
                      this.changeCurrency(currency);
                  }}
                >
                  <div className={styles["currency-label"]}>
                    <div className={styles["label"]}>
                      {currencyLabel[currency]}
                    </div>

                    <div className={styles["currency"]}>{currency}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
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

export default compose<Props, OwnProps>(
  connect(mapStateToProps),
  graphql(currencyQuery)
)(Currencies);
