import { useState } from "react";

const defaultPageSizeOptions = {
    4: 4, 12: 12, 36: 36, 72: 72, 108: 108
};

const defaultInitialPageSize = Object.values(defaultPageSizeOptions)[0];

export default function usePagination
    (pageSizeOptions = defaultPageSizeOptions, initialPageSize = defaultInitialPageSize) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const setPageSizeOptions = (newPageSizeOptions) => pageSizeOptions = newPageSizeOptions;
    const setInitialPageSize = (newInitialPageSize) => initialPageSize = newInitialPageSize;

    return { page, setPage, pageSize, setPageSize, pageSizeOptions, setPageSizeOptions, initialPageSize, setInitialPageSize };
}