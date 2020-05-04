import React from "react";
import { Container, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function AppMenu() {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Icon size="big" name="users" style={{ marginRight: "1.5em" }} />
          Fast Chat
        </Menu.Item>
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
      </Container>
    </Menu>
  );
}
