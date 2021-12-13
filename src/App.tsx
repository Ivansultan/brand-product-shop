import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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
    return (
      <div className="App">
        <Provider store={store}>
          <ApolloProvider client={client}>
            <div>
              <Header />
              {/* https://github.com/remix-run/react-router/issues/8146#issuecomment-947860640 */}
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              </BrowserRouter>
            </div>
          </ApolloProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
