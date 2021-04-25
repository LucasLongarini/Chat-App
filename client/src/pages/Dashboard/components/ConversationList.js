import { Grid, Box, Typography, Input, Icon } from "@material-ui/core";
import ConversationItem from './ConversationItem';
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 20,
    },
    profile: {
        margin: "30px 0",
    },
    chatLabel: {
        marginBottom: 12
    },
    inputContainer: {
        borderRadius: 5,
        backgroundColor: '#E9EEF9',
    },
    input: {
        padding: '18px 18px 18px 10px',
        fontWeight: 600,
        fontSize: 13,
        '&::placeholder': {
            color: '#000000',
            color: '#B1C3DF',
            opacity: 1,
        }
    },
    searchIcon: {
        color: '#B1C3DF',
        marginLeft: 18
    },
    list: {
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 16
    },
    listItem: {
        borderRadius: 8,
        boxShadow: "0 2px 10px 0 #5885C40C"
    }
}));

export default function ConversationList() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={0} direction='column'>
            <Grid className={classes.profile} item ><ConversationItem title="Lucas Longarini" /></Grid>

            <Grid item>
                <Typography className={classes.chatLabel} variant="h3">
                    Chats
                </Typography>
            </Grid>

            <Grid item>
                <Box className={classes.inputContainer}>
                    <Input
                        disableUnderline
                        id="filled-basic"
                        placeholder="Search"
                        variant="filled"
                        fullWidth
                        inputProps={{ className: classes.input }}
                        startAdornment={<Icon className={classes.searchIcon}><SearchIcon/></Icon>}
                    />
                </Box>
            </Grid>

            <Grid item>
                <Box className={classes.listContainer} style={{ maxHeight: '100vh', overflowX: 'hidden' }} >
                    <Grid className={classes.list} container direction="column" spacing={5}>
                        <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                        <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                        <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                        <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                        <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                        <Grid className={classes.listItem} item ><ConversationItem title="Lucas Longarini" detail="Whats up?" /></Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>

    );
}