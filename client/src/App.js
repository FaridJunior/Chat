import React from "react";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppMenu from "./AppMenu";
import Home from "./Home";
import "./style.css";
function App() {
  return (
    <Router>
      <div className="centered-wrapper">
        <AppMenu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
