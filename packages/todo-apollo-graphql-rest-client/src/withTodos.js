import gql from "graphql-tag";

const withTodos = gql`
  query Todos {
    todos @rest(type: "Todo", path: "/todos") {
      id
      text
      completed
    }
  }
`;

export default withTodos;
