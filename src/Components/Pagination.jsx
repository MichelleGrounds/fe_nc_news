import React from "react";
import "../CSS/Pagination.css";

function Pagination(props) {
  const { p, limit, total_count } = props;
  const handleChange = p => {
    props.changePage(p);
  };

  return (
    <div className="paginationDisplay">
      {p > 1 ? (
        <button
          className="paginationButton"
          onClick={() => {
            handleChange(-1);
          }}
        >
          Prev
        </button>
      ) : (
        <div />
      )}
      <p>{p}</p>
      {p < Math.ceil(total_count / limit) ? (
        <button
          className="paginationButton"
          onClick={() => {
            handleChange(1);
          }}
        >
          Next
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Pagination;
