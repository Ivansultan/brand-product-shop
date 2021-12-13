import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";

// type Props = {};
type State = { visibility: boolean };

export type Currency = "USD" | "EUR";

type CurrencyQueryResult = {
  loading: boolean;
  currencies: Currency[];
};

type Props = {
  data: CurrencyQueryResult;
};

class Currencies extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibility: false,
    };
  }

  render() {
    const { loading, currencies } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <button
          style={{ marginTop: "28px", border: "transparent" }}
          onClick={() => {
            this.setState({ visibility: !this.state.visibility });
          }}
        >
          <img
            style={{ width: 10, height: 8 }}
            src="https://e7.pngegg.com/pngimages/795/703/png-clipart-arrow-computer-icons-down-arrow-angle-rectangle.png"
            alt="DropdownIcon"
          />
          {this.state.visibility ? (
            <div
              style={{
                position: "absolute",
                top: 50,
                right: 110,
                width: 100,
                height: 150, // remove it
                border: "1px solid red",
                display: "flex", // to hide use "none"
              }}
            >
              <div>
                {currencies.map((currency) => (
                  <ul>{currency}</ul>
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
        </button>
      </div>
    );
  }
}

const currencyQuery = gql`
  query {
    currencies
  }
`;

export default (graphql(currencyQuery as any) as any)(Currencies);
