import React, { Component } from "react";

export default class ViewToggler extends Component {
  state = {
    showContent: false
  };
  toggleShowContent = () => {
    this.setState(currentState => {
      return { showContent: !currentState.showContent };
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleShowContent}>
          {this.state.showContent ? "Hide" : "Add a Comment"}
        </button>
        {this.state.showContent && this.props.children}
      </div>
    );
  }
}
