import React, { Component } from "react";
import "../CSS/DrowdownUserSelection.css";

export default class DropdownUserSelection extends Component {
  state = {
    showMenu: false
  };

  showMenu = this.showMenu.bind(this);
  closeMenu = this.closeMenu.bind(this);

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  render() {
    return (
      <div>
        <button className="dropDownUserSelectionButton" onClick={this.showMenu}>
          Pick a user
        </button>

        {this.state.showMenu ? (
          <div className="dropdownShowUsers">
            {this.props.users.map(user => {
              return (
                <button onClick={this.loginAsUser} key={user.username}>
                  {user.username}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
  loginAsUser = event => {
    this.props.selectCurrentUser(event.target.innerText);
  };
}
