import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { Header } from "todo-components";

import withTodos from "./withTodos";

const withCreateTodo = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

export default graphql(withCreateTodo, {
  props: ({ mutate }) => ({
    createTodo: ({ text }) =>
      mutate({
        variables: { text },
        refetchQueries: [
          {
            query: withTodos
          }
        ]
      })
  })
})(Header);
