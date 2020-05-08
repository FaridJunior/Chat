import React, { Component } from "react";
import { Grid, Image, List, Segment, Form, Container } from "semantic-ui-react";
import chatBk from "./images/chatBk3.jpg";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

var socket;
export class Home extends Component {
  constructor(props) {
    console.log("home constroctor ");
    super(props);
    this.state = {
      usersList: [],
      talkTo: {},
    };
  }

  setListenToEvents = () => {
    socket.on("usersList", (data) => {
      this.setState({ usersList: data.usersList });
      console.log(data);
      this.storeState();
    });
    socket.on("message", () => {});
  };
  storeState = () => {
    window.localStorage.setItem("home_state", JSON.stringify(this.state));
  };
  getState = () => {
    const state = JSON.parse(window.localStorage.getItem("home_state"));
    this.setState(state);
  };
  componentDidMount() {
    console.log("user status", this.props.userData.login);
    if (this.props.userData.login) {
      socket = io("http://127.0.0.1:5000/home");
      this.setListenToEvents();
      socket.emit("active_user", { userId: this.props.userData.userId }, () => {
        console.log("emit active user");
      });
    }
    this.getState();
    console.log("home did mount ");
  }

  render() {
    console.log("home render");
    if (this.props.userData.userId === null) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    }

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
            <UsersList usersList={this.state.usersList} />
          </Grid.Column>
          <Grid.Column width={12} style={{ padding: "0px" }}>
            <ChatBoard />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;

class UsersList extends Component {
  constructor(props) {
    super(props);
  }
  displayUsers = (users) => {
    return users.map((user, i) => {
      return (
        <List.Item key={i}>
          <Image avatar src="/myAvatar.png" />
          <List.Content verticalAlign="top">
            <List.Header>{user["userName"]}</List.Header>
            <List.Description>Last seen watching</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  };
  render() {
    return (
      <Segment style={{ height: "92vh" }} inverted>
        <List selection divided verticalAlign="middle" size="huge" inverted>
          {this.props.usersList && this.displayUsers(this.props.usersList)}
        </List>
      </Segment>
    );
  }
}

class ChatBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <List
          animated
          verticalAlign="middle"
          size="big"
          style={{
            padding: "14px",
            marginBottom: "0px",
            backgroundColor: "#ECEFF1",
          }}
        >
          <List.Item>
            <Image avatar src="/myAvatar.png" />
            <List.Content>
              <List.Header>mohamed</List.Header>
            </List.Content>
          </List.Item>
        </List>
        <div className="b2" style={{ backgroundImage: `url(${chatBk}` }}></div>
        <Container
          style={{
            padding: "12px",
            backgroundColor: "#ECEFF1",
          }}
          textAlign="center"
        >
          <Form size="large">
            <Form.Field size="large" required>
              <input
                placeholder="Type a Message ."
                style={{ borderRadius: "2rem" }}
              />
            </Form.Field>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}
