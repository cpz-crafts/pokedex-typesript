import React from 'react';
import MuiPagination from '@mui/material/Pagination';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      size="large"
    />
  );
};

export default Pagination;
