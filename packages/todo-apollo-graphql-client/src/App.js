import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";

import { Container } from "todo-components";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const client = new ApolloClient({
  link: httpLink,
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
