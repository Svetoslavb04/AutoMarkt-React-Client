import {
    List, ListItem, Typography
} from '@mui/material';

export default function CategoriesList(props) {
    return (
        <List sx={{ p: '0' }}>
            {props.categories.map(category => {
                return (
                    <ListItem button key={category}>
                        <Typography variant={props.categoryFontSize} style={{ color: props.categoryFontColor }}>{category}</Typography>
                    </ListItem>)
            })}
        </List>
    );
}