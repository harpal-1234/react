import React, { useState } from "react";
import ReactPaginate from "react-paginate";


export default function Pagination({ pageCount, pageValue, setPage }) {
  

  function newFunction(data) {
    console.log(data, "value in function");
    setPage(data);
  }
  return (
    <>
      {pageCount > 1 && (
        <div className="card-footer clearfix">
          <ReactPaginate
            pageCount={pageCount}
            forcePage={pageValue}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"....."}
            marginPagesDisplayed={2}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"page-item active"}
            onPageChange={(selected) => {
              newFunction(selected.selected);
            }}
          />
        </div>
      )}
    </>
  );
}
