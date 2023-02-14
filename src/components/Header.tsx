import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { Category } from "../graphql/types";
import { AppState } from "../reducer";
import CartPopup from "./CartPopup";
import Currencies from "./Currencies";
import styles from "./Header.module.css"; // Import css modules stylesheet as styles

type OwnProps = {};

type StoreProps = {
  categoryName: Category["name"];
};

type CategoriesQueryResult = {
  loading: boolean;
  categories: Category[];
};

type GraphQLProps = {
  data: CategoriesQueryResult;
};

type Props = OwnProps & StoreProps & GraphQLProps;

type State = {};

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles["header"]}>
        <div className={styles["category-links"]}>
          {this.props.categoryName === undefined ? (
            <div className={styles["category-item"]}>
              <Link className={styles["link-active"]} to="/">
                ALL
              </Link>
            </div>
          ) : (
            <div className={styles["category-item"]}>
              <Link className={styles["link-default"]} to="/">
                ALL
              </Link>
            </div>
          )}

          {!this.props.data.loading &&
            this.props.data.categories.map((category) => {
              if (category.name === this.props.categoryName) {
                return (
                  <div key={category.name} className={styles["category-item"]}>
                    <Link
                      className={styles["link-active"]}
                      to={`/category/${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div key={category.name} className={styles["category-item"]}>
                    <Link
                      className={styles["link"]}
                      to={`/category/${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </div>
                );
              }
            })}
        </div>

        <div className={styles["icon-section"]}>
          <div className={styles["icon-block"]}>
            <div className={styles["semicircle"]}>
              <div className={styles["vector"]}></div>
            </div>
          </div>
        </div>

        <div className={styles["currency-cart-section"]}>
          <div className={styles["currency"]}>
            <Currencies />
          </div>
          <div className={styles["cart"]}>
            <CartPopup place="POPUP" />
          </div>
        </div>
      </div>
    );
  }
}

const currencyQuery = gql`
  query {
    categories {
      name
    }
  }
`;

const mapStateToProps = (state: AppState): StoreProps => {
  return {
    categoryName: state.categoryName,
  };
};

export default compose<Props, OwnProps>(
  connect(mapStateToProps),
  graphql(currencyQuery)
)(Header);
