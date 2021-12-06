import React from "react";
import { Link } from "react-router-dom";

type Props = {};
type State = {};

class CategoryPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>CategoryPage</h1>
        <Link to="/product/10">Product 10</Link>
      </div>
    );
  }
}

export default CategoryPage;
