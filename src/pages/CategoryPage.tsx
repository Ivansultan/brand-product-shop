import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";
import { Link } from "react-router-dom";
import { AppState } from "../reducer";
import { compose } from "recompose";
import { connect } from "react-redux";
import { getPrice } from "../components/CartPage.utils";
import { currencyLabel, withParams } from "../utils";
import styles from "./CategoryPage.module.css";
import { Category } from "../graphql/types";

type OwnProps = {};

type CategoryQueryResult = {
  loading: boolean;
  categories: Category[];
};

type GraphQLProps = {
  data: CategoryQueryResult;
};

type Props = OwnProps & StoreProps & GraphQLProps;

type StoreProps = {
  currency: AppState["currency"];
  cartItems: AppState["cartItems"];
  categoryName: AppState["categoryName"];
};

type State = {};

class CategoryPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading, categories } = this.props.data;
    const { currency } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={styles["category-page"]}>
        {categories
          .filter((category) => this.props.categoryName == category.name)
          .map((category) => (
            <div key={category.name}>
              <div className={styles["category-name"]}>
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </div>
              <div className={styles["category-section"]}>
                {category.products.map((product) => {
                  const inItem = this.props.cartItems
                    .map((item) => item.id)
                    .includes(product.id);

                  const itemIcon = inItem ? (
                    <div
                      className={styles["cart-icon-section"]}
                      key={product.id}
                    >
                      <div className={styles["cart-icon-block"]}>
                        <div className={styles["vector"]}></div>
                        <div className={styles["trapezoid"]}></div>
                        <div className={styles["circle-section"]}>
                          <div className={styles["circle"]}></div>
                          <div className={styles["circle"]}></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  );

                  if (product.inStock === true) {
                    const price = getPrice(product.prices, currency);
                    return (
                      <Link
                        className={styles["category-product"]}
                        key={`/product/${product.id}`}
                        to={`/product/${product.id}`}
                      >
                        <div
                          // className={inItem ? styles["borderStyle"] : undefined}
                          style={
                            inItem
                              ? {
                                  padding: "15px",
                                  border: "1px solid white",
                                  borderRadius: "2px",
                                  boxShadow: "1px 1px 10px lightGray",
                                }
                              : { padding: "15px" }
                          }
                        >
                          <div className={styles["product-image-section"]}>
                            <img
                              className={styles["product-image"]}
                              alt=""
                              src={product.gallery[0]}
                            />
                          </div>

                          {itemIcon}
                          <div className={styles["product-brand-name"]}>
                            {product.brand} {product.name}
                          </div>
                          <div className={styles["product-currency-amount"]}>
                            {currencyLabel[this.props.currency]} {price.amount}
                          </div>
                        </div>
                      </Link>
                    );
                  } else {
                    const price = getPrice(product.prices, currency);
                    return (
                      <div
                        key={`price${product.id}`}
                        className={styles["category-product-out-stock"]}
                      >
                        <div className={styles["product-image-section"]}>
                          <img
                            className={styles["product-image"]}
                            alt=""
                            src={product.gallery[0]}
                          />
                          <div className={styles["title-out-stock"]}>
                            OUT OF STOCK
                          </div>
                        </div>

                        {itemIcon}
                        <div className={styles["product-brand-name"]}>
                          {product.brand} {product.name}
                        </div>
                        <div className={styles["product-currency-amount"]}>
                          {currencyLabel[this.props.currency]} {price.amount}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const categoriesQuery = gql`
  query Categories {
    categories {
      name
      products {
        id
        name
        gallery
        brand
        inStock
        attributes {
          id
          name
          items {
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    currency: state.currency,
    cartItems: state.cartItems,
    categoryName: state.categoryName,
  };
};

export default compose<Props, OwnProps>(
  connect(mapStateToProps),
  graphql(categoriesQuery)
)(CategoryPage);
