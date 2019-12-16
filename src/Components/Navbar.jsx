import React, { Component } from "react";
import { Link } from "@reach/router";
import "../CSS/Navbar.css";
import * as api from "../api";

export default class Navbar extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: null,
    selectedTopic: "home"
  };

  handleClick = event => {
    this.setState({ selectedTopic: event.target.innerText });
  };

  render() {
    const { err } = this.state;

    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    if (err) {
      return (
        <p>
          {err.status} - {err.msg}
        </p>
      );
    }
    return (
      <nav className="mainNavigationBar">
        <Link
          onClick={this.handleClick}
          className={`navigationLinks ${
            this.state.selectedTopic === "home" ? "focussedNavigationLink" : ""
          }`}
          to="/"
        >
          home
        </Link>
        {this.state.topics.map(topic => {
          return (
            <Link
              onClick={this.handleClick}
              className={`navigationLinks ${
                this.state.selectedTopic === topic.slug
                  ? "focussedNavigationLink"
                  : ""
              }`}
              key={topic.slug}
              to={`/articles/topic/${topic.slug}`}
            >
              {topic.slug}
            </Link>
          );
        })}
        <Link
          onClick={this.handleClick}
          className={`navigationLinks ${
            this.state.selectedTopic === "home" ? "focussedNavigationLink" : ""
          }`}
          to="/users"
        >
          users
        </Link>
      </nav>
    );
  }
  componentDidMount = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics, isLoading: false });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data }
        });
      });
  };
}
