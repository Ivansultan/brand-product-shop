import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";
import { Link } from "react-router-dom";

type Product = {
  id: string;
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
      <div style={{ flexWrap: "wrap" }}>
        <h1>Category page</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "yellow",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {category.products.map((product) => {
            return (
              <Link to={`/product/${product.id}`}>
                <div
                  style={{
                    backgroundColor: "red",
                    width: "356px",
                    height: "338px",
                    margin: 5,
                  }}
                >
                  {product.name}
                </div>
              </Link>
            );
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
        attributes {
          id
          name
          type
          items {
            value
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;

export default (graphql(categoryQuery as any) as any)(CategoryPage);
