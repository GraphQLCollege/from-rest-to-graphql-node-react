import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Footer } from "todo-components";

import withTodos from "./withTodos";

const withClearAllCompleted = gql`
  mutation ClearAllCompleted {
    clearAllCompleted
      @rest(method: "DELETE", type: "Todo", path: "/todos/completed") {
      ids
    }
  }
`;

export default compose(
  graphql(withTodos, {
    props: ({ data: { todos } }) => ({ todos })
  }),
  graphql(withClearAllCompleted, {
    props: ({ mutate }) => ({
      clearAllCompleted: () =>
        mutate({ refetchQueries: [{ query: withTodos }] })
    })
  })
)(Footer);
