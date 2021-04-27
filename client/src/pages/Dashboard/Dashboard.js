import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import ConversationList from './components/ConversationList';
import ChatContainer from './components/ChatList';
import ConversationService from '../../services/conversationService';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    position: 'relative'
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

function Dashboard({ width }) {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();
  const [mobile, setMobile] = useState(isWidthDown('sm', width));
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function getConversations() {
      try {
        const conversations = await ConversationService.getConversations();
        setConversations(conversations);
      }
      catch {}
    }
    getConversations();
  }, []);

  useEffect(() => {
    setMobile(isWidthDown('sm', width));
  }, [width]);

  async function handleSignout() {
    if (await auth.signout())
      history.push('/login');
  }

  return (
    <Grid className={classes.root} container>

      {(!mobile || (mobile && !isConversationOpen)) &&
        <Grid item container className={`${classes.gridItem} ${classes.ConversationContainer}`} justify="center">
          <Box className={classes.ConversationContainer}>
            <ConversationList conversations={conversations} signoutCallback={handleSignout} username={auth?.user?.username} />
          </Box>
        </Grid>
      }

      {(!mobile || (mobile && isConversationOpen)) &&
        <Grid className={classes.gridItem} item xs>
          <ChatContainer />
        </Grid>
      }
    </Grid>
  );
}

export default withWidth()(Dashboard)
