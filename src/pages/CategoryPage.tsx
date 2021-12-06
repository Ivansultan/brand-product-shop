import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
};

type Category = {
  name: string;
  products: Product[];
};

type CategoryQueryResult = {
  loading: boolean;
  category: Category;
};

type Props = {
  data: CategoryQueryResult;
};

type State = {};

class CategoryPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
  render() {
    const { loading, category } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>CategoryPage</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {category.products.map((product) => {
            return <Link to={`/product/${product.id}`}>{product.name}</Link>;
          })}
        </div>
      </div>
    );
  }
}

const categoryQuery = gql`
  query {
    category(input: { title: "tech" }) {
      name
      products {
        id
        name
      }
    }
  }
`;

export default (graphql(categoryQuery as any) as any)(CategoryPage);
