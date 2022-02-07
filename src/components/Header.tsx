import React from "react";
import Cart from "./Cart";
import Currencies from "./Currencies";

type Props = {};
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
          // backgroundColor: "yellow",
          paddingLeft: "100px",
          paddingRight: "100px",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            // backgroundColor: "red",
            alignItems: "center",
            display: "flex",
            // justifyContent: "flex-start",
          }}
        >
          <span
            style={{
              lineHeight: "19.2px",
              fontSize: "16px",
              width: "65px",
              height: "20px",
              // marginLeft: "117px",
            }}
          >
            WOMEN
          </span>
          <span
            style={{
              lineHeight: "19.2px",
              fontSize: "16px",
              width: "37px",
              height: "20px",
              marginLeft: "32px",
            }}
          >
            MEN
          </span>
          <span
            style={{
              lineHeight: "19.2px",
              fontSize: "16px",
              width: "36px",
              height: "20px",
              marginLeft: "32px",
            }}
          >
            KIDS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "orange",
          }}
        >
          <img
            style={{
              // width: "37px",
              width: "21px",
              height: "21px",
              // marginTop: "28px",
              marginLeft: "-100px",
            }}
            alt="IconApple"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3cD-hx4EKlQu5SISeRXySpxnenP4xcR7HKw&amp;usqp=CAU"
          />
        </div>

        <div
          style={{
            // backgroundColor: "green",
            // marginLeft: "-7px",
            display: "flex",
            alignItems: "center",
            // justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Currencies />
          <Cart />
        </div>
      </div>
    );
  }
}

export default Header;
