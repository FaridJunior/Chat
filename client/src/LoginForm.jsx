import React, { Component } from "react";
import {
  Grid,
  Form,
  Button,
  Header,
  Segment,
  Icon,
  Message,
} from "semantic-ui-react";
import { Redirect } from "react-router";

export class LoginForm extends Component {
  render() {
    if (this.props.user.userId !== null) {
      return (
        <Redirect
          to={{ pathname: "/", state: { from: this.props.location } }}
        />
      );
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 400 }}>
          <Header as="h2" color="black" textAlign="center">
            <Icon name="users" /> Log-in Fast Chat
          </Header>
          <Form size="large" onSubmit={this.props.handleSubmit}>
            <Segment raised>
              <Form.Input
                fluid
                name="userName"
                value={this.props.user.userName}
                icon="user"
                iconPosition="left"
                placeholder="Your Name .. "
                onChange={this.props.handleChange}
              />
              <Button color="black" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>You don't need to Sign Up </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
