const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

const todos = require("./database/todos");

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
    todos: () => todos.select()
  },
  Mutation: {
    createTodo: (_, { text }) => todos.insert(text),
    toggleAllTodos: () => todos.toggleAll(),
    toggleTodo: (_, { id }) => todos.toggle(id),
    removeTodo: (_, { id }) => todos.remove(id),
    editTodo: (_, { id, text }) => todos.update(id, text),
    clearAllCompleted: () => todos.removeCompleted()
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use("/graphql", cors(), bodyParser.json(), graphqlExpress({ schema }));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.delete("/todos", async (req, res) => {
  await todos.removeAll();
  res.status(200).send(true);
});

app.listen(5000, () => {
  console.log("Go to http://localhost:5000/graphiql to run queries!");
});
