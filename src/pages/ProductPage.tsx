import React from "react";

type Props = {};
type State = {};

class ProductPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return <h1>Product Page</h1>;
  }
}

export default ProductPage;
