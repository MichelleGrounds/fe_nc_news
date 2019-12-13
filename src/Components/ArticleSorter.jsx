import React from "react";
import "../CSS/ArticleSorter.css";

function ArticleSorter(props) {
  const { updateSortBy, updateOrder } = props;

  const handleChangedSort = event => {
    updateSortBy(event.target.value);
  };

  const handleOrderSort = event => {
    updateOrder(event.target.value);
  };

  return (
    // <div>
    <form className="articleSortOrderSelectForm">
      Sort by{" "}
      <select onChange={handleChangedSort} className="articleSortOrderSelect">
        <option value="created_at">Date</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>
      <select onChange={handleOrderSort} className="articleSortOrderSelect">
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
    </form>
  );
}

export default ArticleSorter;
