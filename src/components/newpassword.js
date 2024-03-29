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
import { withRouter } from "react-router-dom";


const styles = theme => ({
  main: {
    width: 'auto',
    marginTop: 120,
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
    marginTop: theme.spacing(1),
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
    fontWeight:400,
  },
  password: {
    fontWeight: 400,
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  forgotpassword: {

    marginTop: theme.spacing(1) ,
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
  },
  joinus: {
    marginTop: theme.spacing(.5),
    marginRight: theme.spacing(1),
    paddingLeft:  theme.spacing(2),
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
  },
  form_hint: {
    fontSize: '.9em'
  }
});

class NewPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {password: ' ', confirmpassword: ' '};
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  checkNewPasswordLogin = () => {
    if(this.state.password.length >=6 && this.state.confirmpassword.length >=6){

    if(this.state.password === this.state.confirmpassword){
      this.props.history.push("/");
    }
    else{
      alert("Password did not match");
    }
  }

    else{
      alert("Password length should be more than 6 characters");
    }
  }

  render(){

    const { classes } = this.props;

  return (
    <div>
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} onSubmit={this.signin}>
        <Typography className={classes.form_hint} component="h5" variant="h5">
          Password should be at least 6 characters long
        </Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input className={classes.password} onChange={this.handleChange} name="password" type="password" id="password" />
        </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input className={classes.password} onChange={this.handleChange} name="confirmpassword" type="password" id="password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.checkNewPasswordLogin}
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

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NewPassword));