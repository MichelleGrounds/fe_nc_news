import React, { Component } from "react";
import DropdownUserSelection from "./DropdownUserSelection";
import * as api from "../api";

export default class UserSelector extends Component {
  state = {
    users: [],
    isLoading: true
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <DropdownUserSelection
          selectCurrentUser={this.props.selectCurrentUser}
          users={this.state.users}
        />
      </div>
    );
  }

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    api.requestUsers().then(users => {
      this.setState({ users, isLoading: false });
    });
  };
}
