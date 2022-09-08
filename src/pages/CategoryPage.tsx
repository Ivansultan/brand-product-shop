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

  render() {
    const { loading, categories } = this.props.data;
    const { currency, params } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div className={styles.categoryPage}>
          {categories
            .filter((category) => !params.name || category.name === params.name)
            .map((category) => (
              <div className={styles.categories} key={category.name}>
                <div className={styles.categoryName}>{category.name}</div>
                <div className={styles.categorySection}>
                  {category.products.map((product) => {
                    const inItem = this.props.cartItems
                      .map((item) => item.id)
                      .includes(product.id);

                    const itemIcon = inItem ? (
                      <>
                        <div className={styles.cartIconSection}>
                          <div className={styles.cartIconBlock}>
                            <div className={styles.vector}></div>
                            <div className={styles.trapezoid}></div>
                            <div className={styles.circleSection}>
                              <div className={styles.circle}></div>
                              <div className={styles.circle}></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    );
                    const price = getPrice(product.prices, currency);
                    return (
                      <Link
                        className={styles.categoryProduct}
                        key={product.id}
                        to={`/product/${product.id}`}
                      >
                        <div key={product.id}>
                          <div className={styles.productImageSection}>
                            <img
                              className={styles.productImage}
                              alt=""
                              src={product.gallery[0]}
                            />
                          </div>

                          {itemIcon}
                          {/* {categoryBorder} */}
                          <div className={styles.productBrandName}>
                            {product.brand} {product.name}
                          </div>
                          <div className={styles.productCurrencyAmount}>
                            {currencyLabel[this.props.currency]} {price.amount}
                          </div>
                        </div>
                      </Link>
                    );
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
