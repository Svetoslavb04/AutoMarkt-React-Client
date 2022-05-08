import { useEffect, useState } from "react"

const defaultPageSizeOptions = {
    4: 4, 12: 12, 24: 24, 48: 48, 96: 96
};

const defaultInitialPageSize = Object.values(defaultPageSizeOptions)[0];

export default function usePagination(pageSizeOptions = defaultPageSizeOptions, initialPageSize = defaultInitialPageSize) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const setPageSizeOptions = (newPageSizeOptions) => pageSizeOptions = newPageSizeOptions;
    const setInitialPageSize = (newInitialPageSize) => initialPageSize = newInitialPageSize;

    useEffect(() => {

        setPage(1);

    }, [pageSize])

    return { page, setPage, pageSize, setPageSize, pageSizeOptions, setPageSizeOptions, initialPageSize, setInitialPageSize };
}