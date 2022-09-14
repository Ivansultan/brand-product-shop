import React from "react";
import styles from "./ProductAttributes.module.css";

type State = {};
type Props = OwnProps;

export type OwnProps = {
  attributes: Attribute[];
  place: "PAGE" | "POPUP";
};

export type AttributeItem = {
  displayValue: string;
  id: string;
  isSelected?: boolean;
};

export type Attribute = {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
};

class ProductAttributes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const { attributes, place } = this.props;

    return (
      <>
        {attributes.map((attribute) => {
          if (attribute.name === "Capacity" && place === "POPUP") {
            return (
              <div>
                <div className={styles["popup-capacity-name"]}>
                  {attribute.name}
                </div>
                <div className={styles["popup-capacity-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Capacity" && place === "POPUP") {
                      return (
                        <div key={item.id}>
                          <div className={styles["popup-capacity"]}>
                            {item.id}
                          </div>
                        </div>
                      );
                    } else {
                      return <div></div>;
                    }
                  })}
                </div>
              </div>
            );
          }

          if (attribute.name === "Capacity" && place === "PAGE") {
            return (
              <div>
                <div className={styles["page-capacity-name"]}>
                  {attribute.name}
                </div>
                <div className={styles["page-capacity-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Capacity" && place === "PAGE") {
                      return (
                        <div key={item.id}>
                          <div className={styles["page-capacity"]}>
                            {item.id}
                          </div>
                        </div>
                      );
                    } else {
                      return <div></div>;
                    }
                  })}
                </div>
              </div>
            );
          }

          if (attribute.name === "Color" && place === "POPUP") {
            return (
              <div
                className={styles["popup-color-name-section"]}
                key={attribute.name}
              >
                {attribute.name}
                <div className={styles["popup-color-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Color" && place === "POPUP") {
                      const style = { backgroundColor: item.id.toLowerCase() };
                      return (
                        <div
                          className={styles["popup-color"]}
                          key={item.id}
                          style={style}
                        >
                          <ul key={item.id}></ul>
                        </div>
                      );
                    } else {
                      return <div></div>;
                    }
                  })}
                </div>
              </div>
            );
          }

          if (attribute.name === "Color" && place === "PAGE") {
            return (
              <div
                className={styles["page-color-name-section"]}
                key={attribute.name}
              >
                {attribute.name}
                <div className={styles["page-color-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Color" && place === "PAGE") {
                      const style = { backgroundColor: item.id.toLowerCase() };
                      return (
                        <div
                          className={styles["page-color"]}
                          key={item.id}
                          style={style}
                        >
                          <ul key={item.id}></ul>
                        </div>
                      );
                    } else {
                      return <div></div>;
                    }
                  })}
                </div>
              </div>
            );
          }

          if (attribute.name === "Size" && place === "PAGE") {
            return (
              <div className={styles["page-size-name-section"]}>
                <div className={styles["page-size-name"]}>{attribute.name}</div>
                <div className={styles["page-size-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Size" && place === "PAGE") {
                      return (
                        <div key={item.id}>
                          <div className={styles["page-size"]}>{item.id}</div>
                        </div>
                      );
                    } else {
                      return <div></div>;
                    }
                  })}
                </div>
              </div>
            );
          }

          if (attribute.name === "Size" && place === "POPUP") {
            return (
              <div className={styles["popup-size-name-section"]}>
                {attribute.name}
                <div className={styles["popup-size-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Size" && place === "POPUP") {
                      return (
                        <div key={item.id}>
                          <div className={styles["popup-size"]}>{item.id}</div>
                        </div>
                      );
                    } else {
                      return <div></div>;
                    }
                  })}
                </div>
              </div>
            );
          } else {
            return <div></div>;
          }
        })}
      </>
    );
  }
}

export default ProductAttributes;
