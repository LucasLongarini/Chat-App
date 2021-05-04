import { Box, Input, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    inputContainer: {
        borderRadius: 5,
        backgroundColor: '#E9EEF9',
    },
    input: {
        padding: '18px 18px 18px 10px',
        fontWeight: 600,
        fontSize: 13,
        '&::placeholder': {
            color: '#B1C3DF',
            opacity: 1,
        }
    },
    searchIcon: {
        color: '#B1C3DF',
        marginLeft: 18
    },
}));

export default function SearchBar({ autoFocus, onChange, placeholder = "Search" }) {
    const classes = useStyles();

    return (
        <Box className={classes.inputContainer}>
            <Input
                onChange={onChange}
                disableUnderline
                autoFocus={autoFocus}
                placeholder={placeholder}
                variant="filled"
                fullWidth
                inputProps={{ className: classes.input }}
                startAdornment={<Icon className={classes.searchIcon}><SearchIcon /></Icon>}
            />
        </Box>
    );
}