import React, { useState } from "react";
import './css/Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({ page, totalItemsCount, handlePageChange }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;