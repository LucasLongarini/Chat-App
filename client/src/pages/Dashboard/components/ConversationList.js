import { useState, useMemo } from 'react';
import { Grid, Typography, IconButton, Menu, MenuItem, Button } from "@material-ui/core";
import ConversationItem from './ConversationItem';
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import OnlineStatus from '../../../state/OnlineStatus';
import AddIcon from '@material-ui/icons/Add';
import { useAuth } from '../../../hooks/useAuth'

import SearchInput from '../../../components/SearchInput';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        padding: theme.spacing(3),
        paddingBottom: 0,
    },
    profile: {
        margin: "20px 0",
    },
    chatHeader: {
        marginTop: 20,
        marginBottom: 12
    },
    icon: {
        color: '#95A7C4',
    },
    seeMoreButton: {
        '& svg': {
            fontSize: 20
        }
    },
    listContainer: {
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    list: {
        paddingTop: 10,
        marginBottom: 20,
        paddingLeft: 16
    },
    selectedListItem: {
        backgroundColor: '#5885C41C'
    }
}));

export default function ConversationList({ conversations, signoutCallback, addConversationCallback, selectedConversation, selectConversationCallback }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = useAuth();
    const parsedConversations = useMemo(() => {
        return conversations?.map(conversation => {
            const otherUser = conversation.users?.filter(user => user.id !== auth.user.id)[0];
            conversation.otherUser = otherUser;
            if (conversation.latestMessage)
                conversation.latestMessage.isRecieved = conversation.latestMessage.fromUserId === auth?.user?.userId;
            return conversation;
        });
    }, [conversations, auth]);

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
                    <Grid item ><ConversationItem title={auth?.user?.username} onlineStatus={OnlineStatus.ONLINE} interactive={false} /></Grid>
                    <Grid item>
                        <IconButton onClick={handleOpenMenu} className={`${classes.icon} ${classes.seeMoreButton}`}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem className={classes.icon} onClick={handleSignout}><ExitToAppIcon /> Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container className={classes.chatHeader} justify="space-between" alignItems="center" >
                <Typography variant="h3">
                    Chats
                </Typography>
                <Button variant="outlined" color="primary"
                    startIcon={<AddIcon />}
                    onClick={addConversationCallback}
                >
                    Start conversation
                </Button>
            </Grid>

            <Grid item>
                <SearchInput />
            </Grid>

            <Grid className={classes.listContainer} item>
                <Grid className={classes.list} container direction="column" spacing={5}>
                    {parsedConversations?.map((conversation, i) => {
                        return (
                            <Grid onClick={()=>selectConversationCallback(i)} key={conversation.id} item >
                                <ConversationItem
                                    title={conversation.otherUser.username}
                                    detail={conversation.latestMessage?.content}
                                    selected={conversation?.id === selectedConversation?.id}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>

    );
}