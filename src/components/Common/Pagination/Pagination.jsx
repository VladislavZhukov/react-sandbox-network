import React from "react";
import ReactPagination from "react-js-pagination";
import pm from "./Pagination.module.css";

let Pagination = ({ currentPage, totalFriendsCount, pageSize, ...props }) => {
  let handlePageChange = (pageNumber) => {
    props.onPageChanged(pageNumber);
  };
  
  return (
    <div className={pm.reactPagination}>
      <ReactPagination
        activePage={currentPage}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalFriendsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange.bind(this)}
      />
    </div>
  );
};

export default Pagination;
