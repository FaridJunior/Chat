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
      userId: null,
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value }); // handle change

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      userName: this.state.userName,
      userId: uuid4(),
    };
    this.setState({ userId: user.userId });
    window.localStorage.setItem("user", JSON.stringify(user));

    axios
      .post(`http://127.0.0.1:5000/login`, { user })
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  loadUser = () => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      this.setState({ userName: user.userName, userId: user.userId });
    }
  };
  componentDidMount() {
    this.loadUser();
  }

  render() {
    return (
      <Router>
        <div className="centered-wrapper">
          <AppMenu user={this.state} />
          <Switch>
            <Route exact path="/">
              <Home user={this.state} />
            </Route>
            <Route exact path="/login">
              <LoginForm
                user={this.state}
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
