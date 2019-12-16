import React, { Component } from "react";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ArticlesList from "./Components/ArticlesList";
import SingleArticlePage from "./Components/SingleArticlePage";
import UserLogin from "./Components/UserLogin";
import ErrorDisplay from "./Components/ErrorDisplay";
import UsersList from "./Components/UsersList";
import SingleUserPage from "./Components/SingleUserPage";
import { Router } from "@reach/router";
import * as api from "./api";
import "./App.css";

export default class App extends Component {
  state = { users: [], currentUser: "", isLoading: true, err: null };

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        <UserLogin
          selectCurrentUser={this.selectCurrentUser}
          currentUser={this.state.currentUser}
          users={this.state.users}
        />
        <Header user={this.state.currentUser} />
        <Navbar />
        <Router primary={false}>
          <ArticlesList path="/" />
          <ArticlesList path="/articles/topic/:topic" />
          <SingleArticlePage
            path="/articles/:article_id"
            currentUser={this.state.currentUser}
          />
          <UsersList path="/users" users={this.state.users} />
          <SingleUserPage path="/users/:username" />
          <ErrorDisplay err={this.state.err} default />
        </Router>
      </div>
    );
  }

  selectCurrentUser = currentUser => {
    this.setState({ currentUser });
  };

  componentDidMount = () => {
    this.getUsers();
  };

  getUsers = () => {
    api
      .requestUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data },
          isLoading: false
        });
      });
  };
}
