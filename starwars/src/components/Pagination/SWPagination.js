import React from "react";
import { Pagination } from "semantic-ui-react";

const SWPagination = ({ getCurrentPage }) => {
  return (
    <>
      <Pagination
        defaultActivePage={1}
        totalPages={9}
        style={{ margin: "1rem 0" }}
        onPageChange={(event, data) => getCurrentPage(data)}
      />
    </>
  );
};

export default SWPagination;
