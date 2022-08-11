import React from "react";

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
      <div>
        {attributes.map((attribute) => {
          if (attribute.name === "Color") {
            return (
              <div key={attribute.name}>
                {attribute.name}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {attribute.items.map((item) => {
                    if (attribute.id === "Color" && place === "PAGE") {
                      return (
                        <div
                          key={item.id}
                          style={{
                            width: 50,
                            height: 45,
                            backgroundColor: item.id.toLowerCase(),
                            border: "1px solid lightGray",
                          }}
                        >
                          <ul key={item.id}></ul>
                        </div>
                      );
                    }
                    if (attribute.id === "Color" && place === "POPUP") {
                      return (
                        <div
                          key={item.id}
                          style={{
                            width: 20,
                            height: 15,
                            backgroundColor: item.id.toLowerCase(),
                            border: "1px solid lightGray",
                          }}
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
          if (attribute.name === "Capacity") {
            return (
              <div>
                {attribute.name}
                <div style={{ flexDirection: "row", display: "flex" }}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Capacity") {
                      return (
                        <div key={item.id}>
                          <div
                            style={{
                              width: 50,
                              height: 45,
                              border: "1px solid lightGray",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {/* <ul> */}
                            {item.id}
                            {/* </ul> */}
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
        })}
      </div>
    );
  }
}

export default ProductAttributes;
