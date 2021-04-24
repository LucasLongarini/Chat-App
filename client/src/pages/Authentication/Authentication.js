import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LoginType from './state/loginType';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: "100vh",
        "& .MuiInput-underline:before": {
            borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)"
        }
    },
    welcome: {
        paddingBottom: 20,
    },
    heroText: {
        textAlign: "center",
        color: "white",
        marginTop: 30,
        maxWidth: 300
    },
    overlay: {
        backgroundImage:
            "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexDirection: "column",
        minHeight: "100vh",
        paddingBottom: 145,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonHeader: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "column",
        bgcolor: "background.paper",
        minHeight: "100vh",
        paddingTop: 23
    },
    accBtn: {
        width: 170,
        height: 54,
        fontSize: 14,
        borderRadius: 5,
        filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
        backgroundColor: "#ffffff",
        color: "#3a8dff",
        boxShadow: "none",
        marginRight: 35
    },
    switchLabel: {
        fontSize: 14,
        color: "#b0b0b0",
        fontWeight: 400,
        textAlign: "center",
        marginRight: 34,
        whiteSpace: "nowrap",
    },
    image: {
        backgroundImage: "url(./images/bg-img.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    box: {
        padding: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        maxWidth: 900,
        margin: "auto"
    },
    link: { textDecoration: "none", display: "flex", flexWrap: "nowrap" },
}));

export default function Authentication({ type }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Login failed");
    const history = useHistory();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    function handleLogin() {
        history.push('/dashboard');
    }

    function handleError(errorMsg) {
        setOpen(true);
        setErrorMsg(errorMsg);
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={3} md={5} className={classes.image}>
                <Box className={classes.overlay}>
                    <Hidden xsDown>
                        <img width={67} src="/images/bubble.svg" />
                        <Hidden smDown>
                            <Typography className={classes.heroText} variant="h2">
                                Converse with anyone with any language
                            </Typography>
                        </Hidden>
                    </Hidden>
                </Box>
            </Grid>
            <Grid item xs={12} sm={9} md={7} elevation={6} component={Paper} square>
                <Box className={classes.buttonHeader}>
                    <Box p={1} alignSelf="flex-end" alignItems="center">
                        <Grid container alignItems="center">
                            <Hidden xsDown>
                                <Typography className={classes.switchLabel}>
                                    {type === LoginType.LOGIN ? "Don't have an account?" : "Already have an account?"}
                                </Typography>
                            </Hidden>
                            <Link to={type === LoginType.LOGIN ? "/signup" : "/login"} className={classes.link}>
                                <Button className={classes.accBtn} variant="contained">
                                    {type === LoginType.LOGIN ? "Create account" : "Login"}
                                </Button>
                            </Link>
                        </Grid>
                    </Box>

                    <Box width="100%" maxWidth={450} p={3} alignSelf="center">
                        <Grid container>
                            <Grid item xs>
                                <Typography className={classes.welcome} variant="h1">
                                    {type === LoginType.LOGIN ? "Welcome back!" : "Create an account."}
                                </Typography>
                            </Grid>
                        </Grid>
                        {type === LoginType.LOGIN ?
                            <LoginForm handleError={handleError} handleLogin={handleLogin} />
                            :
                            <RegisterForm handleError={handleError} handleLogin={handleLogin} />
                        }
                    </Box>
                    <Box p={1} alignSelf="center" />
                </Box>
                <Snackbar anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={errorMsg}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Grid>
        </Grid>
    );
}
