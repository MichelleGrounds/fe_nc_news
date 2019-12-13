import React, { Component } from "react";
import SingleArticle from "./SingleArticle";
import VoteButton from "./VoteButton";
import CommentList from "./CommentList";
import * as api from "../api";

export default class SingleArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null
  };

  render() {
    const { err } = this.state;
    const { article } = this.state;
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    if (err) {
      return (
        <p>
          {err.status} - {err.msg}{" "}
        </p>
      );
    }
    return (
      <div className="singleArticlePage">
        <SingleArticle article={article} />
        <VoteButton
          article_id={article.article_id}
          alterVoteCount={this.alterVoteCount}
        />
        <CommentList
          article_id={article.article_id}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }

  alterVoteCount = vote => {
    api
      .patchArticleVotes(this.state.article.article_id, vote)
      .then(article => {
        this.setState({ article, err: null });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data }
        });
      });
  };

  retrieveArticle = () => {
    api
      .getSingleArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, isLoading: false, err: null });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data }
        });
      });
  };

  componentDidMount = () => {
    this.retrieveArticle();
  };
}
