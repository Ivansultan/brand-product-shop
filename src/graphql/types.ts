import { AppState } from "../reducer";

type Image = string;

type Price = {
  currency: AppState["currency"];
  amount: number;
};

export type Currency = "USD" | "GBP" | "AUD" | "JPY" | "RUB";

export type ProductSize = "Small" | "Medium" | "Large" | "Extra Large";


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

export type Product = {
  id: string;
  brand: string;
  name: string;
  description: string;
  prices: Price[];
  gallery: Image[];
  attributes: Attribute[];
  inStock: boolean;
};

export type Category = {
    name: string;
    products: Product[];
  };