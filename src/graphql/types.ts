import { AppState } from "../reducer";

type Image = string;

type Price = {
  __typename: "Price";
  currency: Currency;
  amount: number;
};

export type CurrencyLabel = "USD" | "GBP" | "AUD" | "JPY" | "RUB";

export type Currency = {
  label: CurrencyLabel;
  symbol: string;
};

export type ProductSize = "Small" | "Medium" | "Large" | "Extra Large";

export type AttributeItem = {
  __typename: "Attribute";
  displayValue: string;
  id: string;
  isSelected: boolean;
};

export type Attribute = {
  __typename: "AttributeSet";
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
};

export type Product = {
  __typename: "Product";
  id: string;
  brand: string;
  name: string;
  description: string;
  category: string;
  prices: Price[];
  gallery: Image[];
  attributes: Attribute[];
  inStock: boolean;
};

export type Category = {
  name: string;
  products: Product[];
};
