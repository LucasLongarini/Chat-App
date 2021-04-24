import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans"],
    fontSize: 12,
    h1: {
      fontSize: 26,
      fontWeight: 600 //semi-bold
    },
    h2: {
      fontSize: 26,
      fontWeight: 400 //regular
    },
    h3: {
      fontSize: 19,
      fontWeight: 600 //semi-bold
    },
    h4: {
      fontSize: 19,
      fontWeight: 400 //regular,
    },
    h5: {
      fontSize: 14,
      fontWeight: 600,
    },
    h6: {
      fontSize: 14,
      fontWeight: 400,
    },

    button: {
      textTransform: 'none'
    }

  },
  palette: {
    primary: { main: "#3A8DFF" },
  }
});
