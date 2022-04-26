import {
    List, ListItem, Typography, Box, Collapse
} from '@mui/material';

export default function CategoriesList(props) {
    return (
        <Box className={props.className}>
            {props.collapsable
                ? <Collapse in={props.isOpen}>
                    <List className={props.listClassName}>
                        {props.categories.map(category => {
                            return (
                                <ListItem button key={category}>
                                    <Typography variant={props.categoryFontSize}>{category}</Typography>
                                </ListItem>)
                        })}
                    </List>
                </Collapse>
                : <List className={props.listClassName}>
                    {props.categories.map(category => {
                        return (
                            <ListItem button key={category}>
                                <Typography variant={props.categoryFontSize}>{category}</Typography>
                            </ListItem>)
                    })}
                </List>
            }
        </Box>
    );
}