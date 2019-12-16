import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import "../CSS/SingleUserPage.css";

export default class SingleUserPage extends Component {
  state = {
    user: {},
    articles: [],
    isLoading: true,
    err: null
  };
  render() {
    const { user, articles } = this.state;
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="userArticlesPage">
        <img src={`${user.avatar_url}`} alt="user avatar"></img>
        <p>{user.username}</p>
        <p>Name: {user.name}</p>
        {articles.length < 1 ? (
          <p>User has not written any articles yet</p>
        ) : (
          <div>
            <p className="userArticleUnorderedListHeader">
              Articles Written By User:
            </p>
            <ul className="unorderedUserArticleList">
              {articles.map(article => {
                return (
                  <li className="userArticleListItems" key={article.article_id}>
                    <Link
                      className="userArticleCardLink"
                      to={`/articles/${article.article_id}`}
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}{" "}
            </ul>
          </div>
        )}
      </div>
    );
  }

  getUserAndArticles = () => {
    Promise.all([
      api.requestSingleUsers(this.props.username),
      api.getArticles(null, this.props.username)
    ])
      .then(([user, articles]) => {
        this.setState({
          user: user,
          articles: articles.articles,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data.msg },
          isLoading: false
        });
      });
  };

  componentDidMount = () => {
    this.getUserAndArticles();
  };
}
