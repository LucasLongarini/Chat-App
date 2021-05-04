import { useState, forwardRef, useRef } from 'react';
import { Paper, Grid, Typography, Box, CircularProgress, List, ListItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import SearchInput from '../../../components/SearchInput';
import ConversationItem from './ConversationItem';
import _ from "lodash";
import ConversationService from '../../../services/conversationService';
import { useAuth } from '../../../hooks/useAuth';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'white',
        position: 'absolute',
        left: "50%",
        transform: "translate(-50%, 0)",
        top: "10%",
        padding: theme.spacing(3),
        width: 500,
        maxWidth: "90%",
        maxHeight: "80%",
        overflow: "auto"
    },
    title: {
        marginBottom: 15,
    },
    list: {
        paddingTop: 0,
        height: "100%",
    },
    loadingContainer: {
        display: 'felx',
        justifyContent: 'center'
    },
}));

function AddConversationModal({ addConversationCallback }) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(_.debounce(value => updateSearch(value), 300), []).current; // To prevent spamming api requests when typing
    const auth = useAuth();

    async function updateSearch(value) {
        if (!value) {
            setUsers([]);
        }
        else {
            let users = await ConversationService.searchUsers(value);
            // filter out yourself
            users = users?.filter(user => user.id !== auth.user.id);
            setUsers(users);
        }
        setIsSearching(false);
    }

    function handleSearchChanged(event) {
        setIsSearching(true);
        searchRef(event.target.value)
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Grid container direction="column" spacing={0}>
                <Grid item>
                    <Typography className={classes.title} variant="h3">Start a conversation</Typography>
                </Grid>

                <Grid item>
                    <SearchInput autoFocus onChange={handleSearchChanged} placeholder="Search by username" />
                </Grid>

                <Grid item className={classes.list} >
                    <List>
                        {isSearching &&
                            <ListItem className={classes.loadingContainer}>
                                <CircularProgress />
                            </ListItem>
                        }

                        {users?.map(user => {
                            return (
                                <ListItem item key={user.id} className={classes.listItem} onClick={() => addConversationCallback(user.id)}>
                                    <ConversationItem badge={false} title={user.username} />
                                </ListItem>
                            );
                        })}
                    </List>

                </Grid>
            </Grid>
        </Paper>
    );
}

export default forwardRef((props, ref) => (
    <AddConversationModal {...props} ref={ref} />
));