import React, { Component } from "react";
import SingleArticle from "./SingleArticle";
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
          {err.status} - {err.msg.msg}{" "}
        </p>
      );
    }
    return (
      <div className="singleArticlePage">
        <SingleArticle article={article} />
        <CommentList
          article_id={article.article_id}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }

  retrieveArticle = () => {
    api
      .getSingleArticle(this.props.article_id)
      .then(article => {
        this.setState({ article, isLoading: false, err: null });
      })
      .catch(err => {
        console.dir(err.response);
        this.setState({
          err: { status: err.response.status, msg: err.response.data },
          isLoading: false
        });
      });
  };

  componentDidMount = () => {
    this.retrieveArticle();
  };
}
