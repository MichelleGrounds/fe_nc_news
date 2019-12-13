import React from "react";
import moment from "moment";
import VoteUpdater from "./VoteUpdater";
import "../CSS/SingleArticle.css";

function SingleArticle(props) {
  const { article } = props;
  return (
    <section className="singleArticleSection">
      <h2 className="singleArticleh2Header">{article.title}</h2>
      <h5 className="articleAuthorAndCreation">
        created by {article.author} on{" "}
        {moment(article.created_at).format("MMM Do YYYY")}
      </h5>
      <p>{article.body}</p>
      <p className="singleArticleCommentsCount">
        Comments: {article.comment_count}
      </p>
      <VoteUpdater article_id={article.article_id} votes={article.votes} />
    </section>
  );
}

export default SingleArticle;
