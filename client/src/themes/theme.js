import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans",
    fontSize: 14,
    h1: {
      fontSize: 26,
      fontWeight: 600 
    },
    h2: {
      fontSize: 26,
      fontWeight: 400 
    },
    h3: {
      fontSize: 19,
      fontWeight: 600 
    },
    h4: {
      fontSize: 19,
      fontWeight: 400 
    },
    h5: {
      fontSize: 14,
      fontWeight: 600,
    },
    h6: {
      fontSize: 12,
      fontWeight: 600,
    },

    button: {
      textTransform: 'none'
    }

  },
  palette: {
    primary: { main: "#3A8DFF" },
  }
});
