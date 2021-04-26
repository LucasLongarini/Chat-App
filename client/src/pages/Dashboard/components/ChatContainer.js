import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, IconButton, MenuItem, Menu, Input } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OnlineStatus from '../../../state/OnlineStatus';
import OnlineCircle from '../../../components/OnlineCirclie';
import ChatItem from './ChatItem';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        padding: theme.spacing(2),
    },
    header: {
        background: 'white',
        boxShadow: '0 2px 20px 0 rgba(88, 133, 196, .1)',
        padding: "24px 30px"
    },
    onlineText: {
        color: theme.palette.lightText
    },
    seeMoreButton: {
        color: '#95A7C4',
        '& svg': {
            fontSize: 30
        }
    },
    chatList: {},
}));

export default function ChatContainer({ username, onlineStatus }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Grid className={classes.root} container direction="column" justify="space-between">
            <Grid item>
                <Box className={classes.header}>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Grid container spacing={5} alignItems="center" wrap="nowrap">
                                <Grid item >
                                    <Typography variant="h3">
                                        Lucas Longarini
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <OnlineCircle onlineStatus={onlineStatus} />
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.onlineText} variant="h6">
                                                {onlineStatus === OnlineStatus.ONLINE ? "Online" : "Offline"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem>Delete conversation</MenuItem>
                            </Menu>
                            <IconButton onClick={handleOpenMenu} className={classes.seeMoreButton}>
                                <MoreHorizIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>

            <Grid item className={classes.chatList} xs>
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
            </Grid>

            <Grid item>
                <Input></Input>
            </Grid>
        </Grid>
    );
}