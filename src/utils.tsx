import { useNavigate, useParams } from "react-router-dom";

export function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

export function withParams(Component: any) {
  return (props: any) => <Component {...props} params={useParams()} />;
}

export type Size = "Small" | "Medium" | "Large" | "ExtraLarge";

export const currencyLabel = {
  USD: "$",
  GBP: "£",
  AUD: "$",
  JPY: "¥",
  RUB: "₽",
};

export const sizeLabel: { [key: string]: string } = {
  Small: "S",
  Medium: "M",
  Large: "L",
  "Extra Large": "XL",
};
