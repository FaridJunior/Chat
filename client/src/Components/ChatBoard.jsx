import React, { Component } from "react";
import { Image, List, Form, Container, Message } from "semantic-ui-react";
import chatBk from "../images/chatBk3.jpg";

class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }; // handle change

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.body !== "") {
      this.props.sendMessage(this.state.body);
      this.setState({ body: "" });
    }
  };

  displayMessages = () => {
    return this.props.talkToUser.messages.map((message, i) => {
      return (
        <Message
          key={i}
          info
          header={message.from.userName}
          content={message.body}
          style={{ maxWidth: "300px", marginLeft: "30px", marginTop: "20px" }}
        />
      );
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const { talkToUser } = this.props;
    if (talkToUser === undefined) {
      return (
        <div
          style={{
            backgroundImage: `url(${chatBk}`,
            height: "92vh",
            width: "100%",
          }}
        ></div>
      );
    }
    return (
      <React.Fragment>
        <List
          animated
          verticalAlign="middle"
          size="big"
          style={{
            padding: "14px",
            marginBottom: "0px",
            backgroundColor: "#A9A9A9",
          }}
        >
          <List.Item>
            <Image
              avatar
              src={`https://www.gravatar.com/avatar/${talkToUser["userId"]}?d=robohash&s=128`}
            />
            <List.Content>
              <List.Header>{talkToUser["userName"]}</List.Header>
            </List.Content>
          </List.Item>
        </List>
        <div
          className="b2"
          style={{
            backgroundImage: `url(${chatBk}`,
            overflow: "scroll",
            height: "100%",
          }}
        >
          {this.displayMessages()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <Container
          style={{
            padding: "12px",
            backgroundColor: "#A9A9A9",
          }}
          textAlign="center"
        >
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Field size="large" required>
              <input
                name="body"
                placeholder="Type a Message ."
                style={{ borderRadius: "2rem" }}
                onChange={this.handleChange}
                value={this.state.body}
              />
            </Form.Field>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default ChatBoard;
