import { Paper, Box} from '@mui/material';
import CategoriesList from '../../CategoriesList.js/CategoriesList';
import './CategoriesPaper.scss'

export default function CategoriesPaper(props) {
    return (
        <>
            <Box className='header-all-categories-list'>
                <Paper sx={{ backgroundColor: 'secondary.dark', boxShadow: 0, borderRadius: '2px' }}>
                    <CategoriesList
                    categories={props.categories}
                    categoryFontSize={props.categoryFontSize}
                    categoryFontColor={props.categoryFontColor}/>
                </Paper>
            </Box>
        </>
    );
}