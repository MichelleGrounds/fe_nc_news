import React, { Component } from "react";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ArticlesList from "./Components/ArticlesList";
import SingleArticlePage from "./Components/SingleArticlePage";
import UserSelector from "./Components/UserSelector";
import ErrorDisplay from "./Components/ErrorDisplay";
import { Router } from "@reach/router";
import "./App.css";

export default class App extends Component {
  state = { currentUser: "" };

  render() {
    return (
      <div className="App">
        <UserSelector
          selectCurrentUser={this.selectCurrentUser}
          currentUser={this.state.currentUser}
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
          <ErrorDisplay default />
        </Router>
      </div>
    );
  }
  selectCurrentUser = currentUser => {
    this.setState({ currentUser });
  };
}
