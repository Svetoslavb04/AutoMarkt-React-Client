import { useNotificationContext } from "../../contexts/NotificationContext";

import { Fade, Alert, Box, Collapse } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import './Notification.scss';

export default function Notification() {
    const { state, hideNotification } = useNotificationContext();

    return (
        <Box className="notification">
            <Fade in={state.visible} unmountOnExit>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                hideNotification();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {state.message}
                </Alert>
            </Fade>
        </Box>
    )
}