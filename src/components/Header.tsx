import React from "react";
import Cart from "./Cart";
import Currencies from "./Currencies";

type Props = {};
type State = {};

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          height: "80px",
          justifyContent: "row",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <span
            style={{
              lineHeight: "19.2px",
              fontSize: "16px",
              width: "65px",
              height: "20px",
              marginLeft: "117px",
              marginTop: "28px",
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
              marginTop: "28px",
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
              marginTop: "28px",
            }}
          >
            KIDS
          </span>

          <img
            style={{
              width: "37px",
              height: "21px",
              marginTop: "28px",
              marginLeft: "311px",
            }}
            alt="IconApple"
            src="https://img2.freepng.ru/20180319/lfq/kisspng-iphone-computer-icons-apple-icon-image-format-app-os7-style-metro-ui-icon-5ab06b3988a639.3893383015215112255597.jpg"
          />

          <img
            style={{
              width: "15px",
              height: "21px",
              marginTop: "28px",
              marginLeft: "459px",
            }}
            src="https://w7.pngwing.com/pngs/881/42/png-transparent-icon-dollar-sign-united-states-dollar-dollar-sign-text-logo-number.png"
            alt="IconDollar"
          />
          <Currencies />
          <Cart />
        </div>
      </div>
    );
  }
}

export default Header;
