import React from "react";
import styles from "./ProductAttributes.module.css";
import { sizeLabel } from "../utils";
import { store } from "../store";
import { UpdateAttributesPayload } from "../reducer";
import { Attribute, AttributeItem } from "../graphql/types";

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

class ProductAttributes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

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
            ? styles["popup-attribute"]
            : styles["page-attribute"];
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

    return (
      <>
        {attributes.map((attribute) => {
          return (
            <div key={attribute.id}>
              <div
                className={
                  styles[
                    place === "POPUP"
                      ? "popup-attribute-name"
                      : "page-attribute-name"
                  ]
                }
              >
                {attribute.name}
              </div>

              <div className={styles["attribute-section"]}>
                {attribute.items.map((item) => {
                  if (attribute.name === "Color") {
                    return (
                      <div style={{}}>
                        <div
                          key={item.id}
                          style={
                            item.isSelected
                              ? {
                                  border: "2px solid lightGreen",
                                  margin: "-2px",
                                  position: "relative",
                                }
                              : {}
                          }
                          onClick={() => {
                            place === "PRODUCT"
                              ? setProductPageAttributeValue!(
                                  attribute.id,
                                  item.id
                                ) //  отрабатывает setState
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
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{
                          maxWidth: "100%",
                        }}
                      >
                        <div
                          key={item.id}
                          style={
                            item.isSelected
                              ? { backgroundColor: "black", color: "white" }
                              : {}
                          }
                          onClick={() => {
                            place === "PRODUCT"
                              ? setProductPageAttributeValue!(
                                  attribute.id,
                                  item.id
                                ) //  отрабатывает setState
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
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default ProductAttributes;
