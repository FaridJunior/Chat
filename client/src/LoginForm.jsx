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
export class LoginForm extends Component {
  render() {
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
          <Form size="large">
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Your Name .. "
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
