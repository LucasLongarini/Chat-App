import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import ConversationList from './components/ConversationList';
import ChatContainer from './components/ChatContainer';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    position: 'relative'
  },
  gridItem: {
    height: "100%"
  },
  conversationContainer: {
    height: '100%',
    overflow: 'hidden'
  },
  chatContainer: {
  }
}));

export default function Dashboard() {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();

  console.log(auth);

  async function handleSignout() {
    if (await auth.signout())
      history.push('/login');
  }

  return (
    <Grid className={classes.root} container>
      <Grid item className={classes.gridItem}>
        <Box className={classes.conversationContainer} minWidth={300} maxWidth={400} width={'30vw'} >
          <ConversationList signoutCallback={handleSignout} username={auth?.user?.username} />
        </Box>
      </Grid>

      <Grid className={classes.gridItem} item xs>
        <ChatContainer />
      </Grid>
    </Grid>
  );
}
