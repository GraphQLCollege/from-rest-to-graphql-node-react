import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { Main } from "todo-components";

import withTodos from "./withTodos";

const withToggleAllTodos = gql`
  mutation ToggleAllTodos {
    toggleAllTodos {
      updated
    }
  }
`;

const withToggleTodo = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

const withRemoveTodo = gql`
  mutation RemoveTodo($id: Int!) {
    removeTodo(id: $id)
  }
`;

const withEditTodo = gql`
  mutation EditTodo($id: Int!, $text: String!) {
    editTodo(id: $id, text: $text) {
      id
      text
      completed
    }
  }
`;

export default compose(
  graphql(withTodos, {
    props: ({ data: { todos } }) => ({ todos })
  }),
  graphql(withToggleAllTodos, {
    props: ({ mutate }) => ({
      toggleAllTodos: () =>
        mutate({
          refetchQueries: [{ query: withTodos }]
        })
    })
  }),
  graphql(withToggleTodo, {
    props: ({ mutate }) => ({
      toggleTodo: ({ id }) =>
        mutate({
          variables: { id },
          refetchQueries: [{ query: withTodos }]
        })
    })
  }),
  graphql(withRemoveTodo, {
    props: ({ mutate }) => ({
      removeTodo: id =>
        mutate({
          variables: { id },
          refetchQueries: [{ query: withTodos }]
        })
    })
  }),
  graphql(withEditTodo, {
    props: ({ mutate }) => ({
      editTodo: (id, text) =>
        mutate({
          variables: { id, text },
          refetchQueries: [{ query: withTodos }]
        })
    })
  })
)(Main);
