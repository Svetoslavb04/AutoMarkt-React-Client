import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import SelectDropdown from "../../Components/SelectDropdown/SelectDropdown";

import './Catalog.scss';

const sortingTypes = {
    0: 'Default',
    1: 'Name (A-Z)',
    2: 'Name (Z-A)',
    3: 'Price Low to High',
    4: 'Price High to Low',
}

export default function Catalog() {
    const [sorting, SetSorting] = useState({ sorting: sortingTypes[0], value: 0 });

    const sort = (value) => SetSorting({ sorting: sortingTypes[value], value });

    return (
        <Box className='catalog-wrapper'>
            <Breadcrumbs items={['Home', 'Catalog']} />
            <Typography variant='h3' component='h1' className='catalog-header-text'>Catalog</Typography>
            <Box className="catalog-content">
                <Box className='catalog-content-options'>
                    <Box className="catalog-content-options-filter-button-wrapper">
                        <Button className="catalog-content-options-filter-button" variant="outlined" size="small">
                            <FilterAltIcon fontSize="small"></FilterAltIcon>
                            Filters
                        </Button>
                    </Box>
                    <Box className="catalog-content-options-sort-by-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-sort-by-text'>Sort By</Typography>
                        <SelectDropdown 
                        className='catalog-content-options-sort-by-dropdown' 
                        onChange={sort}
                        size='small'
                        minWidth='150px'
                        height='32px'
                        items={Object.entries(sortingTypes)}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}