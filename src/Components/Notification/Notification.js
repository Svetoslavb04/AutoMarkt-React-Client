import { useNotificationContext } from "../../contexts/NotificationContext";

import { Alert, IconButton, CloseIcon } from "../../mui-imports.js";

import './Notification.scss';

export default function Notification(props) {

    const { hideNotification } = useNotificationContext();

    return (
        <div className="notification">
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={hideNotification.bind(null, props.message)}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity={props.type ? props.type : 'success'}
            >
                {props.message}
            </Alert>
        </div>
    )
}