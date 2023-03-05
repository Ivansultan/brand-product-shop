import React from "react";

type Props = {};
type State = { count: number };

export const DEFAULT_COUNT = 1;

class QuantityOfProducts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      count: DEFAULT_COUNT,
    };
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleDecrement = () => {
    this.setState({
      count: this.state.count > 1 ? this.state.count - 1 : this.state.count,
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleIncrement}>+</button>
        <span data-testid="result">{this.state.count}</span>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

export default QuantityOfProducts;
