import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";
import { Link } from "react-router-dom";
import { AppState } from "../reducer";
import { compose } from "recompose";
import { connect } from "react-redux";
import { getPrice } from "./ProductPage";
import { currencyLabel, withParams } from "../utils";
import styles from "./CategoryPage.module.css";
import { store } from "../store";

type Price = {
  currency: AppState["currency"];
  amount: number;
};

type Gallery = string;

type Product = {
  id: string;
  name: string;
  brand: string;
  amount: number;
  gallery: Gallery[];
  prices: Price[];
  inStock: boolean;
};

export type Category = {
  name: string;
  products: Product[];
};

type CategoryQueryResult = {
  loading: boolean;
  categories: Category[];
};

type Props = OwnProps & StoreProps & OriginalProps;

type OriginalProps = {
  data: CategoryQueryResult;
};

type StoreProps = {
  currency: AppState["currency"];
  cartItems: AppState["cartItems"];
};

type OwnProps = {
  params: { name: Category["name"] };
  data: CurrencyQueryResult;
};

type CurrencyQueryResult = {
  loading: boolean;
  currencies: AppState["currency"][];
};

type State = {};

class CategoryPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot: Readonly<Props>
  ) {
    store.dispatch({
      type: "SET_CATEGORY_NAME",
      payload: { categoryName: this.props.params.name },
    });
    // console.log(this.props.params.name);
  }

  render() {
    const { loading, categories } = this.props.data;
    const { currency, params } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className={styles["category-page"]}>
          {categories
            .filter((category) => !params.name || category.name === params.name)
            .map((category) => (
              <div className={styles["category"]} key={category.name}>
                <div className={styles["category-name"]}>
                  {category.name[0].toUpperCase() + category.name.slice(1)}
                </div>
                <div className={styles["category-section"]}>
                  {category.products.map((product) => {
                    const inItem = this.props.cartItems
                      .map((item) => item.id)
                      .includes(product.id);

                    const itemIcon = inItem ? (
                      <>
                        <div className={styles["cart-icon-section"]}>
                          <div className={styles["cart-icon-block"]}>
                            <div className={styles["vector"]}></div>
                            <div className={styles["trapezoid"]}></div>
                            <div className={styles["circle-section"]}>
                              <div className={styles["circle"]}></div>
                              <div className={styles["circle"]}></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    );

                    if (product.inStock === true) {
                      const price = getPrice(product.prices, currency);
                      return (
                        <Link
                          className={styles["category-product"]}
                          key={product.id}
                          to={`/product/${product.id}`}
                        >
                          <div key={product.id}>
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
                              {currencyLabel[this.props.currency]}{" "}
                              {price.amount}
                            </div>
                          </div>
                        </Link>
                      );
                    } else {
                      const price = getPrice(product.prices, currency);
                      return (
                        <div className={styles["category-product-out-stock"]}>
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
      </>
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
          currency
          amount
        }
      }
    }
  }
`;

const currencyQuery = gql`
  query {
    currencies
  }
`;

const amountQuery = gql`
  query Product($id: String!) {
    product(id: $id) {
      prices {
        currency
        amount
      }
    }
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    currency: state.currency,
    cartItems: state.cartItems,
  };
};

export default compose(
  withParams,
  connect(mapStateToProps),
  graphql(amountQuery as any) as any,
  graphql<any, any>(categoriesQuery)
)(CategoryPage as any);
