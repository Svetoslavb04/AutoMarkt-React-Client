import { Paper, Box, Collapse } from '@mui/material';
import CategoriesList from '../../CategoriesList/CategoriesList';
import './CategoriesPaperList.scss'

export default function CategoriesPaperList(props) {
    return (
        <Box className={props.className}>
            {props.collapsable
                ? <Collapse in={props.isOpen}>
                    <Paper sx={{ backgroundColor: 'secondary.dark', boxShadow: 0, borderRadius: '2px' }}>
                        <CategoriesList
                            categories={props.categories}
                            categoryFontSize={props.categoryFontSize}
                            categoryFontColor={props.categoryFontColor} />
                    </Paper>
                </Collapse>
                : <Paper sx={{ backgroundColor: 'secondary.dark', boxShadow: 0, borderRadius: '2px' }}>
                    <CategoriesList
                        categories={props.categories}
                        categoryFontSize={props.categoryFontSize}
                        categoryFontColor={props.categoryFontColor} />
                </Paper>
            }
        </Box>
    );
}