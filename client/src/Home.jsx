import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import ChatBoard from "./Components/ChatBoard";
import UsersList from "./Components/UsersList";

var socket;
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.userData,
      usersList: [],
      talkToUser: undefined,
    };
  }
  setTalkTo = (userId) => {
    const talkToUser = this.state.usersList.filter(
      (u) => u.userId === userId
    )[0];
    this.setState({ talkToUser: talkToUser }, () => {
      this.storeState();
    });
  };
  setListenToEvents = () => {
    socket.on("usersList", (data) => {
      this.setState({ usersList: data.usersList });
      this.storeState();
    });
    socket.on("message", (message) => {
      const newUsersList = this.state.usersList.filter(
        (u) => u.userId !== message.from["userId"]
      );
      const fromUser = this.state.usersList.filter(
        (u) => u.userId === message.from["userId"]
      )[0];
      fromUser["messages"].push(message);
      this.setState({ usersList: [...newUsersList, fromUser] }, () => {
        this.storeState();
      });
    });
  };

  storeState = () => {
    window.localStorage.setItem("home_state", JSON.stringify(this.state));
  };
  getState = () => {
    const state = JSON.parse(window.localStorage.getItem("home_state"));
    this.setState(state);
  };
  componentDidMount() {
    this.getState();
    if (this.props.userData.login) {
      socket = io("http://127.0.0.1:5000/home");
      this.setListenToEvents();
      socket.emit("active_user", { userId: this.props.userData.userId }, () => {
        console.log("emit active user");
      });
    }
  }
  componentWillUnmount() {
    this.storeState();
  }
  sendMessage = (body) => {
    const message = {
      to: {
        userName: this.state.talkToUser.userName,
        userId: this.state.talkToUser.userId,
        sid: this.state.talkToUser.sid,
      },
      from: {
        userName: this.state.currentUser.userName,
        userId: this.state.currentUser.userId,
      },
      body,
    };
    socket.emit("new_message", message, () => {
      const newUsersList = this.state.usersList.filter(
        (u) => u.userId !== message.to["userId"]
      );
      const toUser = this.state.usersList.filter(
        (u) => u.userId === message.to["userId"]
      )[0];
      toUser["messages"].push(message);

      this.setState({ usersList: [...newUsersList, toUser] }, () => {
        this.storeState();
      });
    });
  };

  render() {
    if (this.props.userData.userId === null) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    }

    const otherUsersList = this.state.usersList
      ? this.state.usersList.filter(
          (u) => u["userId"] !== this.props.userData.userId
        )
      : [];

    return (
      <Grid
        columns={2}
        style={{
          marginTop: "3.8em",
          padding: "0px",
          height: "92vh",
        }}
      >
        <Grid.Row style={{ padding: "0px" }}>
          <Grid.Column width={4} style={{ padding: "0px" }}>
            <UsersList usersList={otherUsersList} setTalkTo={this.setTalkTo} />
          </Grid.Column>
          <Grid.Column width={12} style={{ padding: "0px" }}>
            <ChatBoard
              talkToUser={this.state.talkToUser}
              sendMessage={this.sendMessage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Home;
