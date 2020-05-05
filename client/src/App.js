import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppMenu from "./AppMenu";
import Home from "./Home";
import "./style.css";
import { v4 as uuid4 } from "uuid";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userId: uuid4(),
    };
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value }); // handle change

  handleSubmit = (event) => {
    // event.preventDefault();
    console.log("submit ");

    const user = {
      userName: this.state.userName,
      userId: this.state.userId,
    };

    axios.post(`http://127.0.0.1:5000/login`, { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };
  render() {
    return (
      <Router>
        <div className="centered-wrapper">
          <AppMenu userName={this.state.userName} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <LoginForm
                userName={this.state.userName}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
