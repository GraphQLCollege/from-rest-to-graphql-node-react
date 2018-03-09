import React from "react";
import { HashRouter as Router } from "react-router-dom";

import "todomvc-app-css/index.css";

class Container extends React.Component {
  render() {
    return (
      <Router>
        <div className="todoapp">{this.props.children}</div>
      </Router>
    );
  }
}

export default Container;
