import { Avatar, Badge, Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    avatar: {
        width: 44,
        height: 44
    },
    badge: {
        height: 9,
        width: 9,
        borderRadius: 100,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    subText: {
        color: '#9CADC8',
        fontSize: 12
    }
}));

export default function ConversationItem({ title, detail }) {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container direction="row" alignItems="center" spacing={3}>
            <Grid item>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<div style={{ backgroundColor: "red" }} className={classes.badge} />}
                >
                    <Avatar className={classes.avatar} alt="Remy Sharp" />
                </Badge>
            </Grid>

            <Grid item>
                {title &&
                    <Typography variant="h5">
                        Lucas Longarini
                    </Typography>
                }
                {detail &&
                    <Typography className={classes.subText} variant="h6">
                        Do you have plans?
                    </Typography>
                }
            </Grid>
        </Grid>
    );
}