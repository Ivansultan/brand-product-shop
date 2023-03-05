import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Category } from "../graphql/types";
import { AppState } from "../reducer";
import CartPopup from "./CartPopup";
import Currencies from "./Currencies";
import styles from "./Header.module.css";
import { ReactComponent as LogoIcon } from "./assets/logo.svg";
import { store } from "../store";

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

  navigateToCategory = (category: Category) => {
    store.dispatch({
      type: "SET_CATEGORY_NAME",
      payload: { categoryName: category.name },
    });

    document.location =
      category.name === "all" ? "/" : `/category/${category.name}`;
  };

  render() {
    return (
      <div className={styles["header"]}>
        <div className={styles["categories-section"]}>
          {!this.props.data.loading &&
            this.props.data.categories.map((category) => {
              const isActive =
                category.name == (this.props.categoryName || "all");
              return (
                <div
                  key={category.name}
                  className={`${isActive && styles["category-active"]} ${
                    styles["category"]
                  }`}
                  style={{
                    cursor: isActive ? "default" : "pointer",
                  }}
                  onClick={() => !isActive && this.navigateToCategory(category)}
                >
                  <div className={styles["category-name"]}>{category.name}</div>
                </div>
              );
            })}
        </div>

        <LogoIcon />

        <div className={styles["header-right"]}>
          <div className={styles["currency"]}>
            <Currencies />
          </div>
          <div className={styles["cart"]}>
            <CartPopup />
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
