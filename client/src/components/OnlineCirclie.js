import { makeStyles } from "@material-ui/core/styles";
import OnlineStatus from '../state/OnlineStatus';

const useStyles = makeStyles(theme => ({
    online: {
        backgroundColor: theme.palette.online
    },
    offline: {
        backgroundColor: theme.palette.offline
    },
    badge: {
        borderRadius: 100,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    }
}));

export default function OnlineCircle({ onlineStatus, size = 10 }) {
    const classes = useStyles();

    return (
        <div
            style={{ width: size, height: size }}
            className={`${classes.badge} ${onlineStatus === OnlineStatus.ONLINE ? classes.online : classes.offline}`}
        />
    )
}