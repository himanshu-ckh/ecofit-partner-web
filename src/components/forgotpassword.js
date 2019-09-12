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
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";


const styles = theme => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) *2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    opacity: '.9',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
    marginTop: theme.spacing(2),
  },
  forgotpassword: {

    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
  },
  verificationCode: {
    fontWeight: 400,
  },
  chip: {
    margin: theme.spacing(1),
    width: '100%',
    height: '50px',
    color: '#2e7d32',
    fontWeight: 'bold'
  },
  links: {
    color: "White",
  },
  linkButton: {
    marginTop: '10px'
  }
});



class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ' ', 
      confirmpassword: ' ',
      verificationCode: ' ',
      checkStatus: 0
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  sendVerifiactionCode = (e) => {
    e.preventDefault()
    Auth.forgotPassword(this.state.email)
    .then(
      data => 
      this.setState({
        checkStatus: 1
      })
      )
    .catch(
      err => 
      console.log(err)
      );
  }

  updatePassword = (e) => {
    e.preventDefault()
    if(this.state.confirmpassword === this.state.password) {
      if(this.state.confirmpassword.length>=6) {
        Auth.forgotPasswordSubmit(this.state.email, this.state.verificationCode, this.state.confirmpassword)
    .then(data => 
      this.setState({
      checkStatus: 2
    }))
    .catch(err => console.log(err));
    }
    else {
      alert("Password should be of at least 6 characters")
    }
      }
    else {
      alert ("Password Do not Match!! Please check the Password again")
    }
  }

  chekFormStatus = (classes) => {
    if (this.state.checkStatus === 0)
    return (
      <div>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => this.sendVerifiactionCode(e)}
              >
                Send Verification Code
          </Button>
              </form>
      </div>
    )
    else if(this.state.checkStatus === 1) {
      return (
        <div>
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
                <InputLabel htmlFor="email">Verification Code</InputLabel>
                <Input
                  className={classes.verificationCode}
                  onChange={this.handleChange}
                  id="verificationCode"
                  name="verificationCode"
                  autoComplete="verificationCode"
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
                onClick={(e) => this.updatePassword(e)}
              >
                Update Password
          </Button>
            </form>
        </div>
      )
    }
    else {
      return (
        <div className={classes.chip}>
          Password reset was successful!!
          <br />
          <div className={classes.linkButton}>
            <Button 
            variant="contained"
            color="primary">
            <Link
                        className={classes.links}
                        style={{ textDecoration: "none" }}
                        to="/"
                      >
                        Login
                        </Link>
            </Button>
          
          </div>
          
        </div>
      )
    }
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
              Recover Password
        </Typography>
        {this.chekFormStatus(classes)}   
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
