import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
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
  mainDivForSignInForm: {
    marginTop: "9%",
    width: "auto",
    marginLeft: theme.spacing.unit *3,
    marginRight: theme.spacing.unit *3,
    [theme.breakpoints.up(400 + theme.spacing.unit *3 *2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    },
    opacity: ".9"
  },
  paper: {
    marginTop: theme.spacing.unit *3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit *2}px ${theme.spacing.unit *3}px ${theme
      .spacing.unit *3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  links: {
    color: "Black",
    hover: "red"
  },
  email: {
    fontWeight: 400
  },
  password: {
    fontWeight: 400
  },
  submit: {
    marginTop: theme.spacing.unit *2,
  },
  forgotpassword: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit *1,
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
  form_hint: {
    fontSize: ".9em"
  }
});

class SignIn extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      email: " ",
      password: " ",
      user: {},
      redirect: true,
      setNewPasswordForm: false,
      signInForm: true,
      newPassword: "",
      confirmNewPassword: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeSetNewPassword = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  checkSignIn = (e) => {
    e.preventDefault();
    Auth.signIn(this.state.email, this.state.password)
      .then(user => {
        this.setState({ user: user });
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.setState({ setNewPasswordForm: true, signInForm: false });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log("error signing in!: ", err);
        alert(err.message);
      });
  };

  setNewPassword = () => {
    if (
      this.state.newPassword.length >= 6 &&
      this.state.confirmNewPassword.length >= 6
    ) {
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
    } else {
      alert("Password should be atleast 6 characters long");
    }
  };

  displaySignInForm = classes => {
    if (this.state.signInForm === true) {
      return (
          <main className={classes.mainDivForSignInForm}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.signInForm}>
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
                <Button autoFocus
                  type={'button' | 'submit'}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => this.checkSignIn(e)}
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
      );
    } else {
      return (
          <main className={classes.setNewPasswordForm}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Set a new password
              </Typography>
              <form className={classes.form}>
                <Typography
                  className={classes.form_hint}
                  component="h5"
                  variant="h5"
                >
                  Password should be at least 6 characters long
                </Typography>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Enter a new password</InputLabel>
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
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.signInFormMainDiv}>{this.displaySignInForm(classes)}</div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
