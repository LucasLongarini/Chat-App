import { Avatar, Badge, Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import OnlineCircle from '../../../components/OnlineCirclie';

const useStyles = makeStyles(theme => ({
    interactive: {
        transition: 'all 0.3s ease',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.03)',
            backgroundColor: '#5885C40B'
        }
    },
    avatar: {
        width: 44,
        height: 44
    },
    subText: {
        color: '#9CADC8',
        fontSize: 12
    }
}));

export default function ConversationItem({ title, detail, onlineStatus, interactive = true }) {
    const classes = useStyles();

    return (
        <Grid className={interactive ? classes.interactive : null} container direction="row" alignItems="center" spacing={3}>
            <Grid item>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<OnlineCircle onlineStatus={onlineStatus} />}
                >
                    <Avatar className={classes.avatar} alt="Remy Sharp" />
                </Badge>
            </Grid>

            <Grid item>
                {title &&
                    <Typography variant="h5">
                        {title}
                    </Typography>
                }
                {detail &&
                    <Typography className={classes.subText} variant="h6">
                        {detail}
                    </Typography>
                }
            </Grid>
        </Grid>
    );
}