import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import ChatBoard from "./Components/ChatBoard";
import UsersList from "./Components/UsersList";
import {
  setSocket,
  listenToMessage,
  listenToActiveUser,
  activateUser,
  sendMessage,
} from "./Socket/socket";

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
    const talkToUser = this.state.usersList.find((u) => u.userId === userId);
    this.setState({ talkToUser: talkToUser });
  };

  setListenToEvents = () => {
    listenToMessage((message) => {
      const newUsersList = this.state.usersList.filter((u) => u.userId !== message.from["userId"]);
      const fromUser = this.state.usersList.find((u) => u.userId === message.from["userId"]);
      fromUser["messages"].push(message);
      this.setState({ usersList: [...newUsersList, fromUser] });
    });
    listenToActiveUser((data) => {
      this.setState({ usersList: data.usersList });
    });
  };

  componentDidMount() {
    if (this.props.userData.login) {
      setSocket();
      this.setListenToEvents();
      activateUser({ userId: this.props.userData.userId });
    }
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

    sendMessage(message, () => {
      const newUsersList = this.state.usersList.filter((u) => u.userId !== message.to["userId"]);
      const toUser = this.state.usersList.find((u) => u.userId === message.to["userId"]);
      toUser["messages"].push(message);
      this.setState({ usersList: [...newUsersList, toUser] });
    });
  };

  render() {
    if (this.props.userData.userId === null) {
      return <Redirect to={{ pathname: "/login", state: { from: this.props.location } }} />;
    }

    const otherUsersList = this.state.usersList
      ? this.state.usersList.filter((u) => u["userId"] !== this.props.userData.userId)
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
          <Grid.Column
            width={12}
            style={{
              padding: "0px",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ChatBoard talkToUser={this.state.talkToUser} sendMessage={this.sendMessage} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Home;
