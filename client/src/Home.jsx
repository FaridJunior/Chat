import React, { Component } from "react";
import {
  Grid,
  Image,
  List,
  Segment,
  Form,
  Input,
  Button,
  Container,
  Icon,
} from "semantic-ui-react";

export class Home extends Component {
  render() {
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
            <Segment style={{ height: "92vh" }} inverted>
              <List
                selection
                divided
                verticalAlign="middle"
                size="huge"
                inverted
              >
                <List.Item>
                  <Image avatar src="/myAvatar.png" />
                  <List.Content verticalAlign="top">
                    <List.Header>Helen</List.Header>
                    <List.Description>Last seen watching</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src="/myAvatar.png" />
                  <List.Content>
                    <List.Header color="orange">Christian</List.Header>
                    <List.Description>Last seen watching</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src="/myAvatar.png" />
                  <List.Content>
                    <List.Header>Daniel</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src="/myAvatar.png" />
                  <List.Content>
                    <List.Header>Daniel</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12} style={{ padding: "0px" }}>
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
                  <List.Header> Mohamed </List.Header>
                </List.Content>
              </List.Item>
            </List>

            <div className="b2"></div>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
