import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.module.css";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import client from "./graphql/client";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import { store, persistor } from "./store";
import styles from "./App.module.css";

type Props = {};
type State = {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={`App ${styles["wrapper"]}`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
              <BrowserRouter>
                <Header />
                <div className={styles["content"]}>
                  <Routes>
                    <Route path="/" element={<CategoryPage />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </ApolloProvider>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
