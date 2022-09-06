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
      <>
        {attributes.map((attribute) => {
          if (attribute.name === "Capacity" && place === "POPUP") {
            return (
              <div>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "16px",
                  }}
                >
                  {attribute.name}
                </div>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Capacity" && place === "POPUP") {
                      return (
                        <div style={{}} key={item.id}>
                          <div
                            style={{
                              backgroundColor: "white",
                              marginTop: "8px",
                              marginRight: "8px",
                              width: 24,
                              height: 24,
                              fontSize: "10px",
                              fontWeight: 400,
                              lineHeight: "22.4px",
                              border: "1px solid lightGray",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
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
                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "18px",
                  }}
                >
                  {attribute.name}
                </div>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Capacity" && place === "PAGE") {
                      return (
                        <div style={{}} key={item.id}>
                          <div
                            style={{
                              marginTop: "7px",
                              marginRight: "8px",
                              width: 63,
                              height: 45,
                              fontSize: "16px",
                              fontWeight: 400,
                              border: "1px solid lightGray",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
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
                style={{
                  marginTop: "8px",
                }}
                key={attribute.name}
              >
                {attribute.name}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  {attribute.items.map((item) => {
                    if (attribute.id === "Color" && place === "POPUP") {
                      return (
                        <div
                          key={item.id}
                          style={{
                            marginRight: "8px",
                            marginTop: "10px",
                            width: 16,
                            height: 16,
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

          if (attribute.name === "Color" && place === "PAGE") {
            return (
              <div
                style={{
                  marginTop: "16px",
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "18px",
                  backgroundColor: "white",
                }}
                key={attribute.name}
              >
                {attribute.name}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  {attribute.items.map((item) => {
                    if (attribute.id === "Color" && place === "PAGE") {
                      return (
                        <div
                          key={item.id}
                          style={{
                            marginRight: "8px",
                            marginTop: "8px",
                            width: 32,
                            height: 32,
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

          if (attribute.name === "Size" && place === "PAGE") {
            return (
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "18px",
                    color: "#1D1F22",
                  }}
                >
                  {attribute.name}
                </div>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Size" && place === "PAGE") {
                      return (
                        <div key={item.id}>
                          <div
                            style={{
                              marginTop: "8px",
                              marginRight: "8px",
                              width: 63,
                              height: 45,
                              border: "1px solid lightGray",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
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

          if (attribute.name === "Size" && place === "POPUP") {
            return (
              <div style={{ marginTop: "8px" }}>
                {attribute.name}
                <div style={{ flexDirection: "row", display: "flex" }}>
                  {attribute.items.map((item) => {
                    if (attribute.id === "Size" && place === "POPUP") {
                      return (
                        <div key={item.id}>
                          <div
                            style={{
                              marginTop: "8px",
                              marginRight: "8px",
                              width: 24,
                              height: 24,
                              fontSize: "10px",
                              border: "1px solid lightGray",
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
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
          } else {
            return <div></div>;
          }
        })}
      </>
    );
  }
}

export default ProductAttributes;
