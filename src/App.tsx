import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import client from "./graphql/client";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import store from "./store";

type Props = {};
type State = {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    // const first = {
    //   a: {
    //     one: 1,
    //     two: 1,
    //     three: 1,
    //     four: 1,
    //     five: 1,
    //   },
    //   b: 2,
    //   c: 3,
    //   d: {
    //     name: "Ivan",
    //     surname: "Soltynchuk",
    //     age: 39
    //   }
    // };

    // const {a, b, ...rest} = first;

    // const result = {
    //    ...first,
    //    c: 7
    // }

    // const { a, ...other } = first;

    // const other = {
    //   ...first,
    //   a: {
    //     ...first.a,
    //     one: 2,
    //   },
    // };

    return (
      <div className="App">
        <Provider store={store}>
          <ApolloProvider client={client}>
            {/* https://github.com/remix-run/react-router/issues/8146#issuecomment-947860640 */}
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </BrowserRouter>
          </ApolloProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
