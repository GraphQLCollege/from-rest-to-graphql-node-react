import React, { Component } from "react";
import uuid from "uuid/v4";
import { Container, Header, Main, Footer } from "todo-components";

class App extends Component {
  state = {
    todos: []
  };
  createTodo = ({ text }) => {
    this.setState(({ todos }) => ({
      todos: todos.concat([{ text, id: uuid() }])
    }));
  };
  toggleAllTodos = () => {
    this.setState(({ todos }) => {
      const completed = todos.some(todo => !todo.completed);
      return {
        todos: todos.map(todo => ({ ...todo, completed }))
      };
    });
  };
  toggleTodo = ({ id }) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, completed: !todo.completed };
      })
    }));
  };
  removeTodo = id => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => {
        if (todo.id !== id) {
          return true;
        }
        return false;
      })
    }));
  };
  clearAllCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => {
        if (todo.completed) {
          return false;
        }
        return true;
      })
    }));
  };
  editTodo = (id, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, text };
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

export default App;
