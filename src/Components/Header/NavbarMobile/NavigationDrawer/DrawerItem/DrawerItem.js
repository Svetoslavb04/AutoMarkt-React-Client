import {
    ListItem, Typography
} from '@mui/material';

export default function DrawerItem(props) {
    return (
        <ListItem button sx={{ borderBottom: '1px solid #ebebeb', p: '12px 20px' }}>
            <Typography variant={props.variant} component='h2' sx={{ letterSpacing: '2px' }}>{props.text}</Typography>
        </ListItem>
    );
}