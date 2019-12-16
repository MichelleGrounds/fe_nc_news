import React, { Component } from "react";
import * as api from "../api";

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
      <div>
        <img src={`${user.avatar_url}`} alt="user avatar"></img>
        <p>{user.username}</p>
        <p>Name: {user.name}</p>
        {articles.length < 1 ? (
          <p>User has not written any articles yet</p>
        ) : (
          <ul className="unorderedUserArticleList">
            Articles Written By User:
            {articles.map(article => {
              return (
                <li className="userArticleLinks" key={article.article_id}>
                  <p>{article.title}</p>
                </li>
              );
            })}{" "}
          </ul>
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
