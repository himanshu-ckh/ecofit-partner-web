import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { Auth } from "aws-amplify";

const styles = theme => ({
  mainpage: {
    marginTop: "7%"
  },
  main: {
    width: "auto",
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    },
    opacity: ".9"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  links: {
    color: "Black",
    hover: "red"
  },
  join: {
    paddingTop: 10,
    display: "inlineBlock"
  },
  email: {
    fontWeight: 400
  },
  password: {
    fontWeight: 400
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  },
  forgotpassword: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 1,
    fontWeight: 500,
    display: "flex",
    flexDirection: "column"
  },
  joinus: {
    marginTop: theme.spacing.unit * 0.5,
    marginRight: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    fontWeight: 500,
    display: "flex",
    flexDirection: "column"
  },
  signInForm: {}
});

class SignIn extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  state = {
    email: " ",
    password: " ",
    user: {},
    redirect: true,
    setNewPasswordForm: false,
    signInForm: true,
    newPassword: "",
    confirmNewPassword: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeSetNewPassword = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  checkSignIn = async () => {
    //alert("akjsldaskhdlkashdlakld");
    return (
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        this.setState({ user: user });
        console.log("successful sign in!");
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.setState({ setNewPasswordForm: true, signInForm: false });
        } else {
          console.log("Not new password challenge");
          this.props.history.push("/");
          console.log("after history");
        }
        console.log(this.state.user);
      })
      .catch(err => {
        console.log("error signing in!: ", err);
        alert(err.message);
      })
    )
  };

  signin = async () => {
    await this.checkSignIn();
    console.log(this.state);
    
  };

  setNewPassword = () => {
    if (this.state.newPassword === this.state.confirmNewPassword) {
      Auth.completeNewPassword(
        this.state.user, // the Cognito User Object
        this.state.newPassword // the new password
      )
        .then(user => {
          // at this time the user is logged in if no MFA required
          console.log(user);
          this.props.history.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      alert("Password did not match. Please check again");
    }
  };

  displaySignInForm = classes => {
    if (this.state.signInForm === true) {
      return (
        <div className={classes.signInForm}>
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
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
                  <Input
                    className={classes.password}
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    id="password"
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.signin}
                >
                  Sign in
                </Button>
                <div className={classes.afersignin}>
                  <div className={classes.forgotpassword}>
                    <Button type="button" className={classes.forgotpassword}>
                      {" "}
                      <Link
                        className={classes.links}
                        style={{ textDecoration: "none" }}
                        to="/forgotpassword"
                      >
                        Forgot password?{" "}
                      </Link>
                    </Button>
                  </div>
                  <div className={classes.joinus}>
                    <Button type="button" className={classes.joinus}>
                      {" "}
                      <Link
                        className={classes.links}
                        style={{ textDecoration: "none" }}
                        to="/joinus"
                      >
                        Not a member?
                      </Link>
                    </Button>
                  </div>
                </div>
              </form>
            </Paper>
          </main>
        </div>
      );
    } else {
      return (
        <div className={classes.setNewPasswordForm}>
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Set new password
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Enter new password</InputLabel>
                  <Input
                    className={classes.password}
                    onChange={this.handleChangeSetNewPassword}
                    name="newPassword"
                    type="password"
                    id="newPassword"
                    value={this.state.newPassword}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Renter password</InputLabel>
                  <Input
                    className={classes.password}
                    onChange={this.handleChangeSetNewPassword}
                    name="confirmNewPassword"
                    type="password"
                    id="password"
                    value={this.state.confirmNewPassword}
                  />
                </FormControl>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.setNewPassword}
                >
                  Reset Password
                </Button>
              </form>
            </Paper>
          </main>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainpage}>{this.displaySignInForm(classes)}</div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
