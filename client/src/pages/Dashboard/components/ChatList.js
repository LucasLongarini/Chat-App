import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, IconButton, MenuItem, Menu, Input, Hidden } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OnlineStatus from '../../../state/OnlineStatus';
import OnlineCircle from '../../../components/OnlineCirclie';
import ChatItem from './ChatItem';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibraryOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
    onlineContainer: {
        marginLeft: 20
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
    chatListContainer: {
        height: "100%",
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '20px 40px',
        [theme.breakpoints.down('xs')]: {
            padding: '20px 10px',
        }
    },
    inputContainer: {
        margin: "0 40px",
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#F4F6FA',
        [theme.breakpoints.down('xs')]: {
            margin: "0 10px",
        }
    },
    input: {
        padding: '30px 25px',
        fontWeight: 600,
        fontSize: 14,
        '&::placeholder': {
            color: '#B1C3DF',
            opacity: 1,
        }
    },
    inputIcons: {
        color: '#D1D9E6',
    },
}));

export default function ChatList({ username, onlineStatus }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Grid className={classes.root} container direction="column" justify="space-between" wrap="nowrap">
            <Grid item container className={classes.header} alignItems="center" justify="space-between" wrap="nowrap">
                <Grid item>
                    <Grid container spacing={0} alignItems="center">
                        <Hidden mdUp>
                            <Grid item >
                                    <IconButton>
                                        <ArrowBackIosIcon />
                                    </IconButton>
                            </Grid>
                        </Hidden>
                        
                        <Grid item >
                            <Typography variant="h3">
                                Lucas Longarini
                            </Typography>
                        </Grid>
                        <Grid item className={classes.onlineContainer}>
                            <Grid container spacing={1} alignItems="center" wrap="nowrap">
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

            <Grid item xs container className={classes.chatListContainer} direction="column-reverse" justify="flex-start" alignItems="stretch" wrap="nowrap">
                <Grid item><ChatItem didSend={true} /></Grid>
                <Grid item><ChatItem didSend={false} /></Grid>
                <Grid item><ChatItem didSend={true} /></Grid>
                <Grid item><ChatItem didSend={false} /></Grid>
                <Grid item><ChatItem didSend={true} /></Grid>
            </Grid>

            <Grid item>
                <Box className={classes.inputContainer}>
                    <Input
                        disableUnderline
                        id="Chat-input"
                        placeholder="Type something..."
                        variant="filled"
                        fullWidth
                        inputProps={{ className: classes.input }}
                        endAdornment={
                            <Grid container direction="row" wrap="nowrap" style={{ width: 'auto' }}>
                                <Grid item>
                                    <IconButton >
                                        <EmojiIcon className={classes.inputIcons} />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton >
                                        <PhotoLibraryIcon className={classes.inputIcons} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        }
                    />
                </Box>
            </Grid>
        </Grid>
    );
}