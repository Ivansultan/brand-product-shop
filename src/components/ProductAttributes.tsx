import React from "react";
import styles from "./ProductAttributes.module.css";
import { sizeLabel } from "../utils";
import { store } from "../store";
import { UpdateAttributesPayload } from "../reducer";

type State = {};
type Props = OwnProps;

export type OwnProps = {
  attributes: Attribute[];
  place: "PAGE" | "POPUP" | "PRODUCT";
  productId: string;
  setProductPageAttributeValue?: (
    attributeId: string,
    attributeValueId: string
  ) => void;
};

export type AttributeItem = {
  displayValue: string;
  id: string;
  isSelected: boolean;
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

  // renderAttributeName = (attribute: Attribute, item: AttributeItem) => {
  //   const { place } = this.props;

  // }

  renderAttributeValue = (attribute: Attribute, item: AttributeItem) => {
    const { place } = this.props;
    let containerClassName;
    let containerStyle;
    let title;
    switch (attribute.id) {
      case "Color":
        containerClassName =
          place === "POPUP" ? styles["popup-color"] : styles["page-color"];
        containerStyle = { backgroundColor: item.id.toLowerCase() };
        title = "";
        break;
      default:
        containerClassName =
          place === "POPUP"
            ? styles["popup-capacity"]
            : styles["page-capacity"];
        containerStyle = {};
        title = sizeLabel[item.id] || item.id;
    }

    return (
      <div className={styles["attribute-section"]} key={item.id}>
        <div
          className={containerClassName}
          style={containerStyle}
          key={`${item.id}-container`}
        >
          {title}
        </div>
      </div>
    );
  };

  chooseAttribute = (params: UpdateAttributesPayload["params"]) => {
    store.dispatch({
      type: "UPDATE_ATTRIBUTES",
      payload: { params },
    });
  };

  render() {
    const { attributes, productId, setProductPageAttributeValue, place } =
      this.props;

    // console.log("ProductAttributes", place, attributes);

    return (
      <>
        {attributes.map((attribute) => {
          return (
            <div key={attribute.id}>
              <div
                // className={styles["page-color-name-section"]}
                className={
                  styles[
                    place === "POPUP"
                      ? "popup-color-name-section"
                      : "page-color-name-section"
                  ]
                }
              >
                {attribute.name}
              </div>

              <div className={styles["attribute-section"]}>
                {attribute.items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={
                        item.isSelected
                          ? { backgroundColor: "black", color: "white" }
                          : {}
                      }
                      onClick={() => {
                        place === "PRODUCT"
                          ? setProductPageAttributeValue!(attribute.id, item.id) //  отрабатывает setState
                          : this.chooseAttribute({
                              // отрабатывает reducer
                              productId: productId,
                              attributeId: attribute.id,
                              attributeValueId: item.id,
                            });
                      }}
                    >
                      {this.renderAttributeValue(attribute, item)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* {attributes.map((attribute) => {
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
                  {attribute.items.map((attributeValue) => {
                    if (attribute.id === "Size" && place === "PAGE") {
                      return (
                        <div key={attributeValue.id}>
                          <div
                            className={styles["page-size"]}
                            style={
                              attributeValue.isSelected
                                ? { backgroundColor: "red" }
                                : {}
                            }
                            onClick={() => {
                              this.chooseAttribute({
                                productId: productId,
                                attributeId: attribute.id,
                                attributeValueId: attributeValue.id,
                              });
                            }}
                          >
                            {sizeLabel[attributeValue.id] || attributeValue.id}
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

          if (attribute.name === "Size" && place === "POPUP") {
            return (
              <div className={styles["popup-size-name-section"]}>
                {attribute.name}
                <div className={styles["popup-size-section"]}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Size" && place === "POPUP") {
                      return (
                        <div key={item.id}>
                          <div className={styles["popup-size"]}>
                            {sizeLabel[item.id] || item.id}
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
          } else {
            return <div></div>;
          }
        })} */}
      </>
    );
  }
}

export default ProductAttributes;
