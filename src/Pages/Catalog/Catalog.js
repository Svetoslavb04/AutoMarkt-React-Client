import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import SelectDropdown from "../../Components/SelectDropdown/SelectDropdown";

import './Catalog.scss';

const sortingTypes =
    ['Default', 'Name (A-Z)', 'Name (Z-A)', 'Price Low to High', 'Price High to Low'];

const showOptions = [12, 24, 48, 96];

export default function Catalog() {
    const [sorting, SetSorting] = useState({ sorting: 'Default', value: sortingTypes[0] });
    const [show, SetShow] = useState(12);

    const sort = (sortingType) => SetSorting(sortingType);
    const showBy = (number) => SetShow(Number(number));

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
                            onChange={sort}
                            items={sortingTypes}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-sort-by-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </Box>
                    <Box className="catalog-content-options-show-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-show-text'>Show</Typography>
                        <SelectDropdown
                            onChange={showBy}
                            items={showOptions}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-show-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}