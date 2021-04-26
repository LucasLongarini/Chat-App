import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from '../../hooks/useAuth'

export default function Dashboard() {
  const history = useHistory();
  const auth = useAuth();

  async function handleSignout() {
    if (await auth.signout())
      history.push('/login');
  }
  
  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(auth.user)}</p>
      <button onClick={handleSignout}>
        Logout
      </button>
    </>
  );
}
