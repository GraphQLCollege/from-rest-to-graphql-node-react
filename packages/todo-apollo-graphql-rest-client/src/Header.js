import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { Header } from "todo-components";

import withTodos from "./withTodos";

const withCreateTodo = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
      @rest(method: "POST", type: "Todo", path: "/todos", bodyKey: "text") {
      id
      text
      completed
    }
  }
`;

export default graphql(withCreateTodo, {
  props: ({ mutate }) => ({
    createTodo: text =>
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
