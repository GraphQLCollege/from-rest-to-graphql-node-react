const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const fetch = require("isomorphic-unfetch");
const cors = require("cors");

const typeDefs = `
  type Query {
    todos: [Todo]
  }
  type Mutation {
    createTodo(text: String!): Todo
    toggleAllTodos: UpdatedCount
    toggleTodo(id: Int!): Todo
    removeTodo(id: Int!): Boolean
    editTodo(id: Int!, text: String!): Todo
    clearAllCompleted: TodoIds
  }
  type Todo {
    id: Int
    text: String
    completed: Boolean
    createdAt: String
    updatedAt: String
    language: String
    sentiment: Int
  }
  type UpdatedCount {
    updated: Int
  }
  type TodoIds {
    ids: [Int]
  }
`;

const resolvers = {
  Query: {
    todos: () =>
      fetch("http://localhost:4000/todos").then(response => response.json())
  },
  Mutation: {
    createTodo: (_, { text }) =>
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      }).then(response => response.json()),
    toggleAllTodos: () =>
      fetch(`http://localhost:4000/todos/toggle`, {
        method: "PUT"
      }).then(response => response.json()),
    toggleTodo: (_, { id }) =>
      fetch(`http://localhost:4000/todos/${id}/toggle`, {
        method: "PUT"
      }).then(response => response.json()),
    removeTodo: (_, { id }) =>
      fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE"
      }).then(response => response.json()),
    editTodo: (_, { id, text }) =>
      fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      }).then(response => response.json()),
    clearAllCompleted: () =>
      fetch(`http://localhost:4000/todos/completed`, {
        method: "DELETE"
      }).then(response => response.json())
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use("/graphql", cors(), bodyParser.json(), graphqlExpress({ schema }));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(5000, () => {
  console.log("Go to http://localhost:5000/graphiql to run queries!");
});
