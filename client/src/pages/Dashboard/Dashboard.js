import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth'
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import ConversationList from './components/ConversationList';

const useStyles = makeStyles(theme => ({
  root: {
      minHeight: "100vh",
  },
  
}));

export default function Dashboard() {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();

  async function handleSignout() {
    if (await auth.signout())
      history.push('/login');
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <ConversationList />
      </Grid>

      <Grid item xs={9}>
        <div></div>
      </Grid>
    </Grid>
  );
}
