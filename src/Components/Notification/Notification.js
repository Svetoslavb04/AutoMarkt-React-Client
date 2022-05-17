import { useNotificationContext } from "../../contexts/NotificationContext";

import { Fade, Alert, IconButton, CloseIcon } from "../../mui-imports.js";

import './Notification.scss';

export default function Notification() {
    const { state, hideNotification } = useNotificationContext();

    return (
        <div className="notification">
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
                    severity={state.type}
                >
                    {state.message}
                </Alert>
            </Fade>
        </div>
    )
}