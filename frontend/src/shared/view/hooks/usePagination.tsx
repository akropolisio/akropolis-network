import React, { useState, useCallback } from 'react';

import { useOnChangeState } from 'shared/helpers/react';
import { notEquals } from 'shared/helpers/notEqual';
import { Pagination } from 'shared/view/components';

const steps = [10, 25, 50, 100];

export default function usePagination<T>(items: T[]) {

  const [currentPage, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const from = currentPage * perPage;
  const to = from + perPage;
  const paginatedItems = items.slice(from, to);

  const changePerPage = useCallback((itemPerPage) => {
    setPage(Math.floor(from / itemPerPage));
    setPerPage(itemPerPage);
  }, [from]);

  useOnChangeState(items.length, notEquals, () => {
    const maxPageNumber = Math.floor(items.length / perPage);
    if (maxPageNumber < currentPage) {
      setPage(maxPageNumber);
    }
  });

  const paginationView = (
    <Pagination
      totalItems={items.length}
      perPage={perPage}
      currentPage={currentPage}
      onChangePerPage={changePerPage}
      onChangePage={setPage}
      paginationSteps={steps}
    />);
  return { items: paginatedItems, paginationView };
}
