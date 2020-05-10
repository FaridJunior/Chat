import React, { Component } from "react";
import { Image, List } from "semantic-ui-react";

class ListItem extends Component {
  handleSetTalkTo = () => {
    this.props.setTalkTo(this.props.user["userId"]);
  };
  setImage = (user) => {
    if (user["active"]) {
      return (
        <Image
          avatar
          src={`https://www.gravatar.com/avatar/${user["userId"]}?d=robohash&s=200`}
        />
      );
    } else {
      return (
        <Image
          avatar
          src={`https://www.gravatar.com/avatar/${user["userId"]}?d=robohash&s=200`}
          disabled
        />
      );
    }
  };
  render() {
    const { user } = this.props;
    console.log("user in list item ", user);

    return (
      <List.Item key={user["userId"]} onClick={this.handleSetTalkTo}>
        {this.setImage(user)}
        <List.Content verticalAlign="top">
          <List.Header>{user["userName"]}</List.Header>
          <List.Description>Last seen watching</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default ListItem;
