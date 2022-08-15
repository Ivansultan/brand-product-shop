import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc/graphql";
import React from "react";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { Category } from "../pages/CategoryPage";
import { AppState } from "../reducer";
import CartPopup from "./CartPopup";
import Currencies from "./Currencies";
import styles from "./Header.module.css"; // Import css modules stylesheet as styles

type CategoriesQueryResult = {
  loading: boolean;
  categories: Category[];
};

type OwnProps = {
  data: CategoriesQueryResult;
  categoryName: Category["name"];
};

type StoreProps = {
  cartItems: AppState["cartItems"];
  currency: AppState["currency"];
};
type Props = OwnProps & StoreProps;

type State = {};

export type Currency = "USD" | "EUR";

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          // backgroundColor: "yellow",
          paddingRight: "101px",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className={styles["category-links"]}>
          <div className={styles["category-item"]}>
            <Link to="/">ALL</Link>
          </div>

          {!this.props.data.loading &&
            this.props.data.categories.map((category) => (
              <div key={category.name} className={styles["category-item"]}>
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </div>
            ))}
          {/*           <div
            style={{
              // backgroundColor: "gray",
              lineHeight: "19.2px",
              fontSize: "16px",
              marginLeft: "32px",
              marginTop: "28px",
            }}
          >
            TECH
          </div>
          <div
            style={{
              // backgroundColor: "orange",
              marginLeft: "32px",
              marginTop: "28px",
            }}
          >
            CLOTHES
          </div> */}
        </div>

        <div
          style={{
            marginRight: "125px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "25px solid #52D67A",
              borderLeft: "3px solid transparent",
              borderRight: "3px solid transparent",
              height: 0,
              width: "25px",
            }}
          >
            <div
              style={{
                marginTop: "10px",
                width: "9px",
                height: "6px",
                borderRadius: "0 0 100px 100px",
                borderBottom: "1.5px solid #FFFFFF",
                borderLeft: "1.5px solid #FFFFFF",
                borderRight: "1.5px solid #FFFFFF",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                  marginLeft: "7.25px",
                  border: "1px solid #FFFFFF",
                  borderWidth: "0 1px 1px 0",
                  display: "inline-block",
                  padding: "1.7px",
                  transform: "rotate(-135deg)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          style={{
            // backgroundColor: "brown",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ marginRight: "22px" }}>
            <Currencies />
          </div>
          <div style={{ marginTop: "32px" }}>
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

export default compose(graphql(currencyQuery as any) as any)(
  Header as any
) as any;
