import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { Router } from "react-router-dom";
import { history } from "./components/Util/history"

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Main />
      </Router>
    );
  }
}

export default App;
