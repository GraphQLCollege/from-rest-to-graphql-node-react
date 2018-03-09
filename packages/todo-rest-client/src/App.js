import React from "react";
import fetch from "unfetch";

import { Container, Header, Main, Footer } from "todo-components";

class App extends React.Component {
  state = {
    todos: []
  };
  async componentDidMount() {
    const todos = await fetch("http://localhost:4000/todos")
      .then(checkStatus)
      .then(response => response.json());
    this.setState({ todos });
  }
  createTodo = async ({ text }) => {
    const todo = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
      .then(checkStatus)
      .then(response => response.json());
    this.setState(({ todos }) => ({
      todos: todos.concat([todo])
    }));
  };
  toggleAllTodos = async () => {
    await fetch(`http://localhost:4000/todos/toggle`, {
      method: "PUT"
    })
      .then(checkStatus)
      .then(response => response.json());
    const todos = await fetch("http://localhost:4000/todos")
      .then(checkStatus)
      .then(response => response.json());
    this.setState({ todos });
  };
  toggleTodo = async ({ id }) => {
    const updatedTodo = await fetch(
      `http://localhost:4000/todos/${id}/toggle`,
      {
        method: "PUT"
      }
    )
      .then(checkStatus)
      .then(response => response.json());
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return updatedTodo;
      })
    }));
  };
  removeTodo = async id => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE"
    })
      .then(checkStatus)
      .then(response => response.json());
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => {
        if (todo.id !== id) {
          return true;
        }
        return false;
      })
    }));
  };
  clearAllCompleted = async () => {
    const ids = await fetch(`http://localhost:4000/todos/completed`, {
      method: "DELETE"
    })
      .then(checkStatus)
      .then(response => response.json());
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => {
        if (ids.includes(id)) {
          return false;
        }
        return true;
      })
    }));
  };
  editTodo = async (id, text) => {
    const updatedTodo = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
      .then(checkStatus)
      .then(response => response.json());
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return updatedTodo;
      })
    }));
  };
  render() {
    return (
      <Container>
        <Header createTodo={this.createTodo} />
        <Main
          todos={this.state.todos}
          toggleAllTodos={this.toggleAllTodos}
          toggleTodo={this.toggleTodo}
          removeTodo={this.removeTodo}
          editTodo={this.editTodo}
        />
        <Footer
          todos={this.state.todos}
          clearAllCompleted={this.clearAllCompleted}
        />
      </Container>
    );
  }
}

// Throw errors on 400 and 500 HTTP status codes
// https://github.com/developit/unfetch#caveats
function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

export default App;
