import { ApolloProvider } from "@apollo/client";
import React from "react";
import "./App.css";
import client from "./graphql/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";

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
      </div>
    );
  }
}

export default App;
