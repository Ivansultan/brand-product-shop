import React from "react";
import styles from "./ProductAttributes.module.css";
import { sizeLabel } from "../utils";
import { store } from "../store";
import { UpdateAttributesPayload } from "../reducer";

type State = {};
type Props = OwnProps;

export type OwnProps = {
  attributes: Attribute[];
  place: "PAGE" | "POPUP";
  productId: string;
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

  renderAttributeValue = (attribute: Attribute, item: AttributeItem) => {
    const { place } = this.props;
    let attributeWrapper;
    let attributeContainerClassName;
    let attributeContainerStyle;
    let attributeValueTitle;
    switch (attribute.id) {
      case "Color":
        attributeWrapper =
          place === "PAGE"
            ? styles["page-color-section"]
            : styles["popup-color-section"];
        attributeContainerClassName =
          place === "PAGE" ? styles["page-color"] : styles["popup-color"];
        attributeContainerStyle = { backgroundColor: item.id.toLowerCase() };
        attributeValueTitle = "";
        break;
      default:
        attributeWrapper =
          place === "PAGE"
            ? styles["page-capacity-section"]
            : styles["popup-capacity-section"];
        attributeContainerClassName =
          place === "PAGE" ? styles["page-capacity"] : styles["popup-capacity"];
        attributeContainerStyle = {};
        attributeValueTitle = sizeLabel[item.id] || item.id;
    }

    return (
      // <div className={variantsMap.attributeWrapper[attribute.id]} key={item.id}>
      <div className={attributeWrapper} key={item.id}>
        <div
          className={attributeContainerClassName}
          style={attributeContainerStyle}
          key={`${item.id}-container`}
        >
          {attributeValueTitle}
        </div>
      </div>
    );
    // if (attribute.id === "Size" || attribute.id === "Capacity") {
    //   return (
    //     <div
    //       className={variantsMap.attributeWrapper[attribute.id]}
    //       key={item.id}
    //     >
    //       <div
    //         className={variantsMap.attributeContainer[attribute.id]}
    //         key={item.id}
    //       >
    //         {attributeValueTitle}
    //       </div>
    //     </div>
    //   );
    // }
    // if (attribute.id === "Color") {
    //   const style = { backgroundColor: item.id.toLowerCase() };
    //   return (
    //     <div
    //       className={variantsMap.attributeWrapper[attribute.id]}
    //       key={item.id}
    //     >
    //       <div
    //         className={variantsMap.attributeContainer[attribute.id]}
    //         key={item.id}
    //         style={style}
    //       ></div>
    //     </div>
    //   );
    // } else {
    //   return <div></div>;
    // }
  };

  chooseAttribute = (params: UpdateAttributesPayload["params"]) => {
    store.dispatch({
      type: "UPDATE_ATTRIBUTES",
      payload: { params },
    });
  };

  render() {
    const { attributes, place, productId } = this.props;

    return (
      <>
        {attributes.map((attribute) => {
          return (
            <div>
              {attribute.name}
              {/* {attribute.items.map((item) =>
                this.renderAttributeValue(attribute, item)
              )} */}
              {attribute.items.map((item) => {
                return (
                  <div
                    style={item.isSelected ? { backgroundColor: "red" } : {}}
                    onClick={() => {
                      this.chooseAttribute({
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
