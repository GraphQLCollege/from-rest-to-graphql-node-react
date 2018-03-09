import React from "react";

import { withRouter, Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    const { location, todos, clearAllCompleted } = this.props;
    const completedTodos = todos
      ? todos.filter(todo => todo.completed).length
      : 0;
    const notCompletedTodos = todos ? todos.length - completedTodos : 0;
    return todos && todos.length ? (
      <footer className="footer">
        <span className="todo-count">
          <strong>{notCompletedTodos}</strong>{" "}
          {notCompletedTodos === 1 ? "item" : "items"} left
        </span>
        <ul className="filters">
          <li>
            <Link
              className={location.pathname === "/" ? "selected" : undefined}
              to="/"
            >
              All
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/active" ? "selected" : undefined
              }
              to="/active"
            >
              Active
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/completed" ? "completed" : undefined
              }
              to="/completed"
            >
              Completed
            </Link>
          </li>
        </ul>
        {completedTodos ? (
          <button className="clear-completed" onClick={clearAllCompleted}>
            Clear completed
          </button>
        ) : null}
      </footer>
    ) : null;
  }
}

export default withRouter(Footer);
