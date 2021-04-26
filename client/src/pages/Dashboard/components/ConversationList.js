import { useState } from 'react';
import { Grid, Box, Typography, Input, Icon, IconButton, Menu, MenuItem } from "@material-ui/core";
import ConversationItem from './ConversationItem';
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OnlineStatus from '../../../state/OnlineStatus';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        paddingLeft: theme.spacing(3),
    },
    profile: {
        margin: "30px 0",
    },
    chatLabel: {
        marginBottom: 12
    },
    inputContainer: {
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#E9EEF9',
    },
    seeMoreButton: {
        color: '#95A7C4',
        '& svg': {
            fontSize: 20
        }
    },
    input: {
        padding: '18px 18px 18px 10px',
        fontWeight: 600,
        fontSize: 13,
        '&::placeholder': {
            color: '#B1C3DF',
            opacity: 1,
        }
    },
    searchIcon: {
        color: '#B1C3DF',
        marginLeft: 18
    },
    listContainer: {
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    list: {
        marginBottom: 20,
        paddingLeft: 16
    },
    listItem: {
        borderRadius: 8,
        boxShadow: "0 2px 10px 0 #5885C40C"
    }
}));

export default function ConversationList({ signoutCallback, username }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSignout = () => {
        handleCloseMenu();
        signoutCallback();
    }

    return (
        <Grid container className={classes.root} spacing={0} direction='column' justify="flex-start" wrap="nowrap">
            <Grid className={classes.profile} item >
                <Grid container direction="row" justify="space-between" alignItems="center" wrap='nowrap'>
                    <Grid item ><ConversationItem title={username} onlineStatus={OnlineStatus.ONLINE} interactive={false}/></Grid>
                    <Grid item>
                        <IconButton onClick={handleOpenMenu} className={classes.seeMoreButton}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleSignout}>Logout</MenuItem>
                            <MenuItem onClick={handleSignout}>Start a new conversation</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Typography className={classes.chatLabel} variant="h3">
                    Chats
                </Typography>
            </Grid>

            <Grid item>
                <Box className={classes.inputContainer}>
                    <Input
                        disableUnderline
                        id="filled-basic"
                        placeholder="Search"
                        variant="filled"
                        fullWidth
                        inputProps={{ className: classes.input }}
                        startAdornment={<Icon className={classes.searchIcon}><SearchIcon /></Icon>}
                    />
                </Box>
            </Grid>

            <Grid className={classes.listContainer} item>
                <Grid className={classes.list} container direction="column" spacing={5}>
                    <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                    <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                    <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                    <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                    <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                    <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}