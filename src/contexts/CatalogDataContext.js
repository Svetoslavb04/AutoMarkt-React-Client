import { useState, createContext, useContext } from "react";
import usePagination from "../hooks/usePagination";

export const CatalogDataContext = createContext();

export const CatalogDataProvider = (props) => {

    const { page, setPage, pageSize, setPageSize, pageSizeOptions } = usePagination();

    const [sorting, setSorting] = useState('default');

    const [filtering, setFiltering] = useState({});

    return (
        <CatalogDataContext.Provider value={{
            page,
            setPage,
            pageSize,
            setPageSize,
            pageSizeOptions,
            sorting,
            setSorting,
            filtering,
            setFiltering
        }}>
            {props.children}
        </CatalogDataContext.Provider>
    )
}

export const useCatalogDataContext = () => useContext(CatalogDataContext);