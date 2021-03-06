import React, { Component } from "react";
import ArticleCard from "../Components/ArticleCard";
import ErrorDisplay from "./ErrorDisplay";
import ArticleSorter from "./ArticleSorter";
import Pagination from "./Pagination";
import * as api from "../api";
import "../CSS/ArticlesList.css";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    total_count: 0,
    limit: 10,
    p: 1,
    isLoading: true,
    sort_by: null,
    order: null,
    err: null
  };
  render() {
    const { err } = this.state;
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <ArticleSorter
          className="articleSorterList"
          updateSortAndOrder={this.updateSortAndOrder}
        />
        <Pagination
          total_count={this.state.total_count}
          p={this.state.p}
          limit={this.state.limit}
          changePage={this.changePage}
        />
        <ul className="unorderedArticlesList">
          {this.state.articles.map(article => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
        {err && <ErrorDisplay err={err} />}
        <Pagination
          total_count={this.state.total_count}
          p={this.state.p}
          limit={this.state.limit}
          changePage={this.changePage}
        />
      </div>
    );
  }

  updateSortAndOrder = (key, value) => {
    this.setState({ [key]: value });
  };
  changePage = p => {
    this.setState(currentState => {
      return { p: currentState.p + p };
    });
  };

  retrieveArticles = () => {
    api
      .getArticles(
        this.props.topic,
        this.state.sort_by,
        this.state.order,
        this.state.limit,
        this.state.p
      )
      .then(data => {
        this.setState({
          articles: data.articles,
          total_count: data.total_count,
          isLoading: false,
          err: null
        });
      })
      .catch(err => {
        this.setState({
          err: { status: err.response.status, msg: err.response.data },
          isLoading: false
        });
      });
  };

  componentDidMount = () => {
    this.retrieveArticles();
  };

  componentDidUpdate = (prevProps, currentState) => {
    if (
      this.props.topic !== prevProps.topic ||
      this.state.sort_by !== currentState.sort_by ||
      this.state.order !== currentState.order ||
      this.state.limit !== currentState.limit ||
      this.state.p !== currentState.p
    ) {
      this.retrieveArticles();
    }
  };
}
