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
        <div
          style={{
            marginBottom: "191px",
          }}
        >
          {categories
            .filter((category) => !params.name || category.name === params.name)
            .map((category) => (
              <div
                key={category.name}
                style={{
                  marginLeft: "100px",
                  marginRight: "102px",
                  // backgroundColor: "red",
                }}
              >
                <div
                  className={styles["category-header"]}
                  style={{
                    paddingLeft: "1px",
                    margin: 0,
                    paddingTop: "80px",
                    fontSize: "42px",
                    fontWeight: 400,
                  }}
                >
                  {category.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {category.products.map((product) => {
                    const inItem = this.props.cartItems
                      .map((item) => item.id)
                      .includes(product.id);

                    const itemIcon = inItem ? (
                      <>
                        <div
                          style={{
                            position: "relative",
                            float: "left",
                            marginTop: "-26px",
                            marginLeft: "290px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "52px",
                            height: "52px",
                            backgroundColor: "#5ECE7B",
                            borderRadius: "26px",
                          }}
                        >
                          <div
                            style={{
                              marginLeft: "2px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                top: "4px",
                                marginRight: "25px",
                                backgroundColor: "#5ECE7B",
                                border: "solid #FFFFFF",
                                borderWidth: "0 2px 2px 0",
                                display: "inline-block",
                                padding: "2px",
                                transform: "rotate(-105deg)",
                                borderRadius: "1.5px",
                              }}
                            ></div>

                            <div
                              style={{
                                width: "14px",
                                height: "14px",
                                backgroundColor: "#5ECE7B",
                                borderTop: "1.5px solid #FFFFFF",
                                borderBottom: "3.5px solid #FFFFFF",
                                borderLeft: "2px solid #FFFFFF",
                                borderRight: "2px solid #FFFFFF",
                                margin: "auto",
                                transform: "perspective(30px) rotateX(-45deg)",
                                borderRadius: "3px",
                              }}
                            ></div>

                            <div
                              style={{
                                position: "relative",
                                bottom: "3px",
                                display: "flex",
                                flexDirection: "row",
                                width: "60%",
                                justifyContent: "space-around",
                                // backgroundColor: "red",
                              }}
                            >
                              <div
                                style={{
                                  width: "2px",
                                  height: "2px",
                                  backgroundColor: "#5ECE7B",
                                  borderRadius: "3px",
                                  border: "2px solid #FFFFFF",
                                }}
                              ></div>

                              <div
                                style={{
                                  width: "2px",
                                  height: "2px",
                                  backgroundColor: "#5ECE7B",
                                  borderRadius: "3px",
                                  border: "2px solid #FFFFFF",
                                }}
                              ></div>
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
                        style={{
                          textDecoration: "none",
                          marginTop: "103px",
                        }}
                        key={product.id}
                        to={`/product/${product.id}`}
                      >
                        <div key={product.id}>
                          <div
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "center",
                              border: "1px solid lightGray",
                              width: "354px",
                              height: "330px",
                              // backgroundColor: "red",
                            }}
                          >
                            <img
                              style={{
                                maxWidth: "354px",
                                maxHeight: "330px",
                              }}
                              alt=""
                              src={product.gallery[0]}
                            />
                          </div>

                          {itemIcon}
                          {/* {categoryBorder} */}
                          <div
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",
                              fontWeight: 300,
                              lineHeight: "160%",
                              color: "#1D1F22",
                              marginTop: "24px",
                            }}
                          >
                            {product.brand} {product.name}
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              color: "#1D1F22",
                              fontSize: "18px",
                              fontWeight: 500,
                              lineHeight: "160%",
                            }}
                          >
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
