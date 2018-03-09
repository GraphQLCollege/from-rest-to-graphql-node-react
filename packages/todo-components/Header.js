import React from "react";

class Header extends React.Component {
  state = { text: "" };
  render() {
    const { createTodo } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={({ target }) =>
            this.setState(({ text }) => ({ text: target.value }))
          }
          onKeyPress={({ key }) => {
            if (key === "Enter") {
              const text = this.state.text.trim();
              if (text) {
                createTodo({ text });
                this.setState({ text: "" });
              }
            }
          }}
          value={this.state.text}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

export default Header;
