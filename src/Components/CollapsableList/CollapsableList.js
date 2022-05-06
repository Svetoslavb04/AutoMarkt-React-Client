import {
    List, ListItem, Typography, Box, Collapse
} from '@mui/material';

export default function CollabsableList(props) {
    return (
        <Box className={props.className}>
            {props.collapsable
                ? <Collapse in={props.isOpen}>
                    <List className={props.listClassName}>
                        {props.items.map(item => {
                            return (
                                <ListItem button key={item}>
                                    <Typography variant={props.textFontSize}>{item}</Typography>
                                </ListItem>)
                        })}
                    </List>
                </Collapse>
                : <List className={props.listClassName}>
                    {props.items.map(item => {
                        return (
                            <ListItem button key={item}>
                                <Typography variant={props.textFontSize}>{item}</Typography>
                            </ListItem>)
                    })}
                </List>
            }
        </Box>
    );
}