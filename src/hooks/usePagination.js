import { useEffect, useState } from "react"

const pageSizeOptions = {
    4: 4, 12: 12, 24: 24, 48: 48, 96: 96
};

const defaultPageSize = Object.values(pageSizeOptions)[0];

export default function usePagination() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    useEffect(() => {

        setPage(1);

    }, [pageSize])

    return { page , setPage, pageSize, setPageSize, pageSizeOptions };
}