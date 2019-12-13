import React from "react";
import moment from "moment";
import { Link } from "@reach/router";
import "../CSS/ArticleCard.css";

const ArticleCard = props => {
  const { article } = props;
  return (
    <li className="articleListItem">
      <Link className="articleCardLink" to={`/articles/${article.article_id}`}>
        <h2 className="articleCardh2Header">{article.title}</h2>
        <h4 className="articleCardh4Header">
          created by {article.author} on{" "}
          {moment(article.created_at).format("MMM Do YYYY")}
        </h4>
        <h5 className="articleCardh5Header">Topic: {article.topic}</h5>
        <p className="commentAndVotesArticleCard">Comments: {article.comment_count}</p>
        <p className="commentAndVotesArticleCard">Votes: {article.votes}</p>
      </Link>
    </li>
  );
};

export default ArticleCard;
