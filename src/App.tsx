import { ApolloProvider } from "@apollo/client";
import React from "react";
import "./App.css";
import client from "./graphql/client";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <h1>Hello</h1>
      </ApolloProvider>
    </div>
  );
}

export default App;
