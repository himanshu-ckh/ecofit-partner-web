import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Navbar from "./navbar";


const styles = theme => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing.unit *3,
    marginRight: theme.spacing.unit *3,
    [theme.breakpoints.up(400 + theme.spacing.unit *3 *2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    opacity: '.9',
  },
  paper: {
    marginTop: theme.spacing.unit *8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit *2}px ${theme.spacing.unit *3}px ${theme.spacing.unit *3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  links: {
    color: 'Black',
    hover: 'red'
  },
  join: {
    paddingTop: 10,
    display: 'inlineBlock',
  },
  email: {
    fontWeight: 400,
  },
  password: {
    fontWeight: 400,
  },
  submit: {
    marginTop: theme.spacing.unit *2,
  },
  forgotpassword: {

    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit *1,
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
  },
});

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '',password: ' ', confirmpassword: ' ' };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Navbar />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
        </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  className={classes.email}
                  onChange={this.handleChange}
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input className={classes.password} onChange={this.handleChange} name="password" type="password" id="newPassword1" />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input className={classes.password} onChange={this.handleChange} name="confirmpassword" type="password" id="newPassword2" />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.changePassword}
              >
                Confirm password
          </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);
