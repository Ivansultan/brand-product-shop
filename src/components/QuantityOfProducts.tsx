import React from "react";

type Props = {};
type State = { count: number };

class QuantityOfProducts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
        {this.state.count}
        <button onClick={() => this.setState({ count: this.state.count - 1 })}>
          -
        </button>
      </div>
    );
  }
}

export default QuantityOfProducts;
