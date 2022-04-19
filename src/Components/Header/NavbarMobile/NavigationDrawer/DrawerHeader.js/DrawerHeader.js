import {
    ListItemText, ListItemIcon, ListItem, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DrawerHeader(props) {
    return (
        <ListItem sx={{ borderBottom: '1px solid #ebebeb', p: '12px 20px' }}>
            <ListItemText key='drawerHeaderText'>
                <Typography variant='h5' component='h2' sx={{ letterSpacing: '2px' }}>{props.text}</Typography>
            </ListItemText>
            <ListItemIcon key='drawerHeaderIcon' sx={{ justifyContent: 'end' }}>
                <CloseIcon
                    cursor='pointer'
                    color='secondary.dark'
                    onClick={props.onClick}
                    sx={{
                        '&:hover': {
                            fill: 'black'
                        }
                    }} />
            </ListItemIcon>
        </ListItem>
    )
}