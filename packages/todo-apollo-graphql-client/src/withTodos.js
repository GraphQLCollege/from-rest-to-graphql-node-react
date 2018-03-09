import gql from "graphql-tag";

const withTodos = gql`
  query Todos {
    todos {
      id
      text
      completed
    }
  }
`;

export default withTodos;
