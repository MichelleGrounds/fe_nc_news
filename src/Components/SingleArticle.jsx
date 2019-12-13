import React from "react";
import moment from "moment";
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
      <p className="singleArticleVotes">Votes: {article.votes}</p>
    </section>
  );
}

export default SingleArticle;
