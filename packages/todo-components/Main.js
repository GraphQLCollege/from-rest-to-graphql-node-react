import React from "react";
import { withRouter } from "react-router-dom";

import "./Main.css";

class Main extends React.Component {
  state = { isEditing: null };
  render() {
    const {
      todos,
      toggleAllTodos,
      toggleTodo,
      removeTodo,
      editTodo,
      location
    } = this.props;
    return todos && todos.length ? (
      <section className="main">
        {this.state.isEditing ? (
          <div
            className="edit-todo-overlay"
            onClick={() => {
              this.setState(({ isEditing }) => ({
                isEditing: null
              }));
            }}
          />
        ) : null}
        <input
          className="toggle-all"
          type="checkbox"
          onChange={toggleAllTodos}
          checked={!!todos.some(todo => todo.completed)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos
            .filter(todo => {
              if (location.pathname === "/completed") {
                return todo.completed;
              }
              if (location.pathname === "/active") {
                return !todo.completed;
              }
              return true;
            })
            .map(({ id, text, completed }) => (
              <li
                key={id}
                className={`${completed ? "completed" : ""} ${
                  this.state.isEditing === id ? "editing" : ""
                }`}
              >
                <div className="view">
                  <input
                    className="toggle"
                    onChange={() => toggleTodo({ id: id })}
                    checked={completed}
                    type="checkbox"
                  />
                  <label
                    onDoubleClick={() => {
                      this.setState(({ isEditing }) => ({
                        isEditing: id
                      }));
                    }}
                  >
                    {text}
                  </label>
                  <button onClick={() => removeTodo(id)} className="destroy" />
                </div>
                <input
                  className="edit"
                  onBlur={({ target: { value } }) => editTodo(id, value)}
                  onKeyPress={({ key, target: { value } }) => {
                    if (key === "Enter") {
                      editTodo(id, value);
                      this.setState(({ isEditing }) => ({
                        isEditing: null
                      }));
                    }
                  }}
                  defaultValue={text}
                />
              </li>
            ))}
        </ul>
      </section>
    ) : null;
  }
}

export default withRouter(Main);
