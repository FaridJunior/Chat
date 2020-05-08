import React from "react";
import { Container, Menu, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function AppMenu({ user }) {
  const displayItem = () => {
    if (user.login) {
      return (
        <React.Fragment>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Image avatar src="/myAvatar.png"></Image>
              {user.userName}
            </Menu.Item>
          </Menu.Menu>
        </React.Fragment>
      );
    } else {
      return (
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
      );
    }
  };

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Icon size="big" name="users" style={{ marginRight: "1.5em" }} />
          Fast Chat
        </Menu.Item>
        {displayItem()}
      </Container>
    </Menu>
  );
}
