import { useState } from "react";

const defaultPageSizeOptions = {
    3: 3, 9: 9, 27: 27, 54: 54, 81: 81
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