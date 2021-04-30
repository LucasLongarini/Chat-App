import { Grid, Box, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from '../../../hooks/useAuth';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        display: 'flex',
        margin: "10px 0"
    },
    chatContainer: {
        width: "60%",
        [theme.breakpoints.down('md')]: {
            width: "80%"
        },
    },
    avatar: {
        marginTop: 4,
        width: 30,
        height: 30
    },
    dateText: {
        color: theme.palette.lightText,
    },
    chatText: {
        padding: "10px 16px",
    },
    sent: {
        borderRadius: "10px 10px 0 10px",
        color: "#91A3C0",
        background: "#F4F6FA"
    },
    received: {
        borderRadius: "0 10px 10px 10px",
        color: "white",
        background: "linear-gradient(315deg, rgba(108,193,255,1) 0%, rgba(58,141,255,1) 100%)"
    }
}));

export default function ChatItem({ message, users }) {
    const classes = useStyles();
    const auth = useAuth();

    const user = users?.filter(user => user.id === message?.fromUserId)[0];
    const didSend = user?.id === auth?.user?.id;
    const time = (new Date(message.sent)).toTimeString().split(':');

    return (
        <Box className={classes.root} style={{justifyContent: didSend ? "flex-end" : "flex-start"}}>
            <Grid className={classes.chatContainer} container alignItems="flex-start" wrap="nowrap" spacing={1}>
                {!didSend &&
                    <Grid item>
                        <Avatar className={classes.avatar} />
                    </Grid>
                }

                <Grid item>
                    <Grid container wrap="nowrap" direction="column">
                        <Grid item>
                            <Typography className={classes.dateText} variant="h6" style={{ textAlign: didSend ? "end" : "start" }}>
                                {`${!didSend ? user.username : ''} ${time[0]}:${time[1]}`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={`${classes.chatText} ${didSend ? classes.sent : classes.received}`} variant="h5">
                                {message.content}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}