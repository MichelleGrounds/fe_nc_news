import React, { Component } from "react";
import "../CSS/UserLogin.css";

export default class DropdownUserSelection extends Component {
  state = {
    usernameInput: "",
    passwordInput: ""
  };

  render() {
    return (
      <div>
        {!this.props.currentUser ? (
          <form className="userloginForm" onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input
                name="usernameInput"
                onChange={this.handleChange}
                value={this.state.usernameInput}
                required
              ></input>
            </label>

            <label>
              Password:
              <input
                name="passwordInput"
                type="password"
                value={this.state.passwordInput}
                onChange={this.handleChange}
                required
              ></input>
            </label>

            <button className="loginSubmitButton" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={this.handleLogout}>
            <button className="logoutButton">Logout</button>
          </form>
        )}
      </div>
    );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogout = () => {
    this.props.selectCurrentUser("");
  };

  handleSubmit = event => {
    const { usernameInput, passwordInput } = this.state;
    event.preventDefault();

    const extractedUsers = [];
    this.props.users.forEach(user => {
      extractedUsers.push(user.username);
    });

    if (extractedUsers.includes(usernameInput) && passwordInput === "test") {
      this.loginAsUser(usernameInput);
    } else {
      alert("Incorrect Username or Password");
    }

    this.setState({ usernameInput: "", passwordInput: "" });
  };

  loginAsUser = user => {
    this.props.selectCurrentUser(user);
  };
}
