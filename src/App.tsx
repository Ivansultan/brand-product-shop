import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import client from "./graphql/client";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import { store, persistor } from "./store";

type Props = {};
type State = {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    // const attributesValue = {
    //   attributes: [
    //     {
    //       id: "Color",
    //       name: "Color",
    //       type: "swatch",
    //       items: [
    //         {
    //           displayValue: "Green",
    //           id: "Green",
    //         },
    //         {
    //           displayValue: "Cyan",
    //           id: "Cyan",
    //         },
    //         {
    //           displayValue: "Blue",
    //           id: "Blue",
    //         },
    //         {
    //           displayValue: "Black",
    //           id: "Black",
    //         },
    //         {
    //           displayValue: "White",
    //           id: "White",
    //         },
    //       ],
    //     },
    //     {
    //       id: "Capacity",
    //       name: "Capacity",
    //       type: "text",
    //       items: [
    //         {
    //           displayValue: "512G",
    //           id: "512G",
    //         },
    //         {
    //           displayValue: "1T",
    //           id: "1T",
    //           isSelected: true,
    //         },
    //       ],
    //     },
    //   ],
    // };

    // const selectedAttributeItems = ["234324:512G", "White"]
    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
              {/* {attributesValue.attributes.map((attribute) => {
                return attribute.items.map((item) => {
                  return (
                    <div
                      style={{
                        background: item.isSelected ? "red" : "white",
                      }}
                    >
                      {item.id}
                    </div>
                  );
                });
              })} */}
              {/* https://github.com/remix-run/react-router/issues/8146#issuecomment-947860640 */}
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<CategoryPage />} />
                  <Route path="/category/:name" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </BrowserRouter>
            </ApolloProvider>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
