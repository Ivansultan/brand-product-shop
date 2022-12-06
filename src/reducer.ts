import { Product, SelectedAttributeValues } from "./pages/ProductPage";

export type CartProduct = Product & {
  quantity: number;
  // isSelected?: boolean; // TODO: Delete?
};

export type Currency = "USD" | "GBP" | "AUD" | "JPY" | "RUB";

export type ProductSize = "Small" | "Medium" | "Large" | "Extra Large";

export type AppState = {
  cartItems: CartProduct[];
  currency: Currency;
  categoryName: string;
};

export const initialState: AppState = {
  cartItems: [],
  currency: "USD",
  categoryName: "ALL",
};

type ActionType =
  | "CART_ADD_ITEM"
  | "CART_REMOVE_ITEM"
  | "SET_CURRENCY"
  | "CART_INCREMENT_ITEM"
  | "CART_DECREMENT_ITEM"
  | "SET_CATEGORY_NAME"
  | "UPDATE_ATTRIBUTES";

type CartAddItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

type CartRemoveItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

export type CartIncrementItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

export type CartDecrementItemPayload = {
  product: Product;
  selectedAttributeValues?: SelectedAttributeValues;
};

export type CurrencyPayload = {
  currency: Currency;
};

type CategoryNamePayload = {
  categoryName: string;
};

export type UpdateAttributesPayload = {
  // productId: Product.productId;
  params: {
    productId: string;
    attributeId: string;
    attributeValueId: string;
  };
};

type Action = {
  type: ActionType; //Обязательный параметр (ActionType с которым мы что-то делаем)
  payload:
    | CartAddItemPayload
    | CartRemoveItemPayload
    | CartIncrementItemPayload
    | CartDecrementItemPayload
    | CurrencyPayload
    | CategoryNamePayload
    | UpdateAttributesPayload; // Необязательный параметр (тип ActionType, доп. инфа)
};

export const updateAttributes = (
  attributes: Product["attributes"],
  selectedAttributeValues: { [key: string]: string }
) => {
  const updatedAttributes = attributes.map((attribute) => {
    // при переборке attribute у нас есть возможность показать их список или модифицировать нужные нам
    return !!selectedAttributeValues[attribute.id] // !! - преобразование в boolean type / проверка выбран аттрибут или нет
      ? {
          ...attribute,
          items: attribute.items.map((attrValue) => {
            return {
              ...attrValue,
              isSelected:
                selectedAttributeValues[attribute.id] === attrValue.id,
            };
            // return selectedAttributeValues[attribute.id] === attrValue.id
            //   ? {
            //       ...attrValue,
            //       isSelected: true,
            //     }
            //   : {
            //       ...attrValue,
            //       isSelected: false,
            //     };
          }),
        }
      : attribute;
  });
  return updatedAttributes;
};

export const getProductsAttribute = (
  attributes: CartProduct["attributes"],
  selectedAttributeValues: any
) => {
  return attributes.map((attribute) => {
    return {
      ...attribute,
      items: attribute.items.map((item) => {
        const isSelected =
          item.id === (selectedAttributeValues as any)[attribute.id];
        return {
          ...item,
          isSelected,
        };
      }),
    };
  });
};

const rootReducer = (state = initialState, action: Action): AppState => {
  console.log("----- STATE ----");
  console.log(JSON.stringify(state, null, 2));
  console.log("----- ACTION ----");
  console.log(JSON.stringify(action, null, 2));

  switch (action.type) {
    case "UPDATE_ATTRIBUTES":
      const { productId, attributeId, attributeValueId } = (
        action.payload as UpdateAttributesPayload
      ).params;

      // console.log("productId", productId);
      // console.log("attributeId", attributeId);
      // console.log("attributeValueId", attributeValueId);

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          return cartItem.id === productId
            ? {
                ...cartItem,
                attributes: updateAttributes(cartItem.attributes, {
                  [attributeId]: attributeValueId,
                }),
              }
            : cartItem;
        }),
      };

    // Шагі
    // 1. По productId найті carteItem.id
    // 2. По attributeName  найті carteItem.attributes.id
    // 3. По attributeValue  найті carteItem.attributes.items.id
    // 4. Добавіть carteItem.attributes.items.isSelected = True

    case "CART_ADD_ITEM":
      const { product, selectedAttributeValues } =
        action.payload as CartAddItemPayload;
      const { attributes, ...rest } = product;
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...rest,
            attributes: getProductsAttribute(
              attributes,
              selectedAttributeValues
            ),
            quantity: 1,
          },
        ],
      };
    case "CART_REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item.id !== (action.payload as CartRemoveItemPayload).product.id
        ),
      };
    case "CART_INCREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === (action.payload as CartIncrementItemPayload).product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };
    case "CART_DECREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === (action.payload as CartDecrementItemPayload).product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "SET_CATEGORY_NAME":
      return {
        ...state,
        categoryName: (action.payload as CategoryNamePayload).categoryName,
      };

    case "SET_CURRENCY":
      const newState = {
        ...state,
        currency: (action.payload as CurrencyPayload).currency,
      };

      return newState;
    default:
      return state;
  }
};

export default rootReducer;
