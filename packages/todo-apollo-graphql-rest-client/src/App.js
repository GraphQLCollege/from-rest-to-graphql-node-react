import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { RestLink } from "apollo-link-rest";

import { Container } from "todo-components";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const restLink = new RestLink({
  uri: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json"
  }
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Header />
          <Main />
          <Footer />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
