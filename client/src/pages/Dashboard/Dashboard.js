import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import { Grid, Box, Modal, IconButton, Snackbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import CloseIcon from "@material-ui/icons/Close";
import io from 'socket.io-client';

import ConversationList from './components/ConversationList';
import ChatList from './components/ChatList';
import ConversationService from '../../services/conversationService';
import AddConversationModal from "./components/AddConversationModal";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    position: 'relative',
    overflow: 'hidden'
  },
  ConversationContainer: {
    height: "100%",
    maxWidth: "100%",
    width: 650,
    [theme.breakpoints.up('md')]: {
      minWidth: 300,
      maxWidth: 400,
      width: "30vw",
    }
  },
  gridItem: {
    height: "100%",
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    }
  }
}));

let socket;

function Dashboard({ width }) {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();
  const [mobile, setMobile] = useState(isWidthDown('sm', width));
  const [conversations, setConversations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error');
  const [selectedConversation, setSelectedConversation] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (selectedConversation?.id)
      socket.emit("join", selectedConversation.id)
  }, [selectedConversation]);

  useEffect(() => {

    async function getConversations() {
      try {
        const conversations = await ConversationService.getConversations();
        setConversations(conversations);
      }
      catch { }
    }
    getConversations();
    socket = io();

    socket.on('onlineUsers', onlineUsers => {
      setOnlineUsers(onlineUsers);
    });
  }, []);

  useEffect(() => {
    setMobile(isWidthDown('sm', width));
  }, [width]);

  async function handleSignout() {
    if (await auth.signout())
      history.push('/login');
  }

  async function handleNewConversation(userId) {
    try {
      const conversation = await ConversationService.createNewConversation(userId);
      if (conversation)
        setConversations(oldConversations => [...oldConversations, conversation]);

      setModalOpen(false);
    }
    catch (err) {
      setErrorMsg(err);
      setErrorOpen(true);
    }

  }

  function handleConversationSelected(id) {
    const conversation = conversations?.find(i => i.id === id);
    setSelectedConversation(conversation);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  return (
    <div>
      <Grid className={classes.root} container>

        {(!mobile || (mobile && !selectedConversation)) && (
          <Grid item container className={`${classes.gridItem} ${classes.ConversationContainer}`} justify="center">
            <Box className={classes.ConversationContainer}>
              <ConversationList
                addConversationCallback={handleOpenModal}
                onlineUsers={onlineUsers}
                conversations={conversations}
                signoutCallback={handleSignout}
                selectedConversation={selectedConversation}
                selectConversationCallback={(i) => handleConversationSelected(i)}
              />
            </Box>
          </Grid>
        )}

        {(!mobile || (mobile && selectedConversation)) && (

          selectedConversation ?
            <Grid className={classes.gridItem} item xs>
              <ChatList
                socket={socket}
                onlineUsers={onlineUsers}
                selectedConversation={selectedConversation}
                backButtonCallback={() => handleConversationSelected(undefined)}
              />
            </Grid>
            :
            <Grid className={classes.gridItem} container item xs justify="center" direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h1">No conversation selected</Typography>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" onClick={handleOpenModal}>
                  Start Conversation
                </Button>
              </Grid>
            </Grid>
        )}
      </Grid>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {<AddConversationModal addConversationCallback={(userId) => handleNewConversation(userId)} />}
      </Modal>

      <Snackbar anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        message={errorMsg}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setErrorOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default withWidth()(Dashboard)
