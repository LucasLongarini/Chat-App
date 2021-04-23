import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from '../../../hooks/useAuth';

const useStyles = makeStyles(theme => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    label: { fontSize: 19, color: "rgb(0,0,0,0.4)", paddingLeft: "5px" },
    submit: {
        margin: theme.spacing(3, 2, 2),
        padding: 10,
        width: 160,
        height: 56,
        borderRadius: 3,
        marginTop: 49,
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "#3a8dff"
    },
    inputs: {
        marginTop: ".8rem",
        height: "2rem",
        padding: "5px"
    },
    forgot: {
        paddingRight: 10,
        color: "#3a8dff"
    }
}));

function RegisterForm({ handleError, handleLogin }) {
    const auth = useAuth();
    const classes = useStyles();

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string()
                    .required("Username is required")
                    .max(40, "Username is too long"),
                email: Yup.string()
                    .required("Email is required")
                    .email("Email is not valid"),
                password: Yup.string()
                    .required("Password is required")
                    .max(100, "Password is too long")
                    .min(6, "Password too short")
            })}
            onSubmit={({ username, email, password }, { setStatus, setSubmitting }) => {
                setStatus();
                auth.register(username, email, password)
                    .then(() => handleLogin())
                    .catch(errorMsg => {
                        setSubmitting(false);
                        setStatus(errorMsg);
                        handleError(errorMsg);
                    });
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                    noValidate
                >
                    <TextField
                        id="username"
                        label={
                            <Typography className={classes.label}>
                                Username
                      </Typography>
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{ classes: { input: classes.inputs } }}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        helperText={touched.username ? errors.username : ""}
                        error={touched.username && Boolean(errors.username)}
                        value={values.username}
                        onChange={handleChange}
                    />
                    <TextField
                        id="email"
                        label={
                            <Typography className={classes.label}>
                                E-mail address
                      </Typography>
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{ classes: { input: classes.inputs } }}
                        name="email"
                        autoComplete="email"
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
                        value={values.email}
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        label={
                            <Typography className={classes.label}>
                                Password
                      </Typography>
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            classes: { input: classes.inputs }
                        }}
                        type="password"
                        autoComplete="current-password"
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        value={values.password}
                        onChange={handleChange}
                    />

                    <Box textAlign="center">
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting}
                        >
                            Create
                    </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default RegisterForm;