import React, { Component } from "react";
import { List, Segment } from "semantic-ui-react";
import ListItem from "./ListItem";

class UsersList extends Component {
  displayUsers = (users) => {
    return users.map((user, i) => {
      return <ListItem user={user} setTalkTo={this.props.setTalkTo} key={i} />;
    });
  };
  render() {
    return (
      <Segment style={{ height: "100vh" }} inverted>
        <List selection divided verticalAlign="middle" size="huge" inverted>
          {this.props.usersList && this.displayUsers(this.props.usersList)}
        </List>
      </Segment>
    );
  }
}

export default UsersList;
