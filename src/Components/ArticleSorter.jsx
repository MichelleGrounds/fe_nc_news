import React from "react";
import "../CSS/ArticleSorter.css";

function ArticleSorter(props) {
  const { updateSortAndOrder } = props;

  const handleSort = event => {
    updateSortAndOrder(event.target.id, event.target.value);
  };

  return (
    <form className="articleSortOrderSelectForm">
      Sort by{" "}
      <select
        onChange={handleSort}
        id="sort_by"
        className="articleSortOrderSelect"
      >
        <option value="created_at">Date</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>
      <select
        onChange={handleSort}
        className="articleSortOrderSelect"
        id="order"
      >
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
    </form>
  );
}

export default ArticleSorter;
