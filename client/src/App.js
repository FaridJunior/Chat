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
      login: false,
      active: false,
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value }); // handle change

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      userName: this.state.userName,
      userId: uuid4(),
    };

    axios
      .post(`http://127.0.0.1:5000/login`, { user })
      .then((res) => {
        this.setState({
          userId: user.userId,
          login: true,
        });
        window.localStorage.setItem("userData", JSON.stringify(this.state));
      })
      .catch((err) => console.log(err));
  };
  loadUser = () => {
    const userData = JSON.parse(window.localStorage.getItem("userData"));
    if (userData) {
      this.setState({
        userName: userData.userName,
        userId: userData.userId,
        login: userData.login,
      });
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
              <Home userData={this.state} />
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
