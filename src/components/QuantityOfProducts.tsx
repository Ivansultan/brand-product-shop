import React from "react";

type Props = {};
type State = { count: number };

class QuantityOfProducts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      count: 1,
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
        {this.state.count}
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}

export default QuantityOfProducts;
