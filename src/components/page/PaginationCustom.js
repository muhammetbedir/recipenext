import { Pagination } from "@mui/material";
import React from "react";

export const PageCount = 20;
const PaginationCustom = ({ children, count, page, setPage }) => {
  return (
    <div>
      {children}
      <div className="flex justify-center">
        <div className="w-8/12 items-center justify-center flex flex-col">
          <Pagination
            count={Math.ceil(count / PageCount)}
            page={page ? page + 1 : 1}
            onChange={(event, newPage) => setPage(newPage - 1)}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationCustom;
