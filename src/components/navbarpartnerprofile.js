import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import Amplify, { Auth, API } from 'aws-amplify'

const styles = {
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: 'black',
    opacity: 0.6,
  },
  links: {
    color: 'white',
    hover: 'red'
  },
  homelink: {
    color: 'white',
    hover: 'red',
    paddingLeft: 10,
  },
  navbardiv: {
    display: 'inline-block',
    width: '100%',
  }
};

class Navbarpage extends React.Component{

  logout = () =>{
    alert("yes");
    Auth.signOut()
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err));
    this.props.history.push("partnersignin");
  }

  render(){
  const { classes } = this.props;

  return (
    <div className={classes.navbardiv}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <Button type="button" className={classes.button}> <Link className={classes.links} style={{ textDecoration: 'none'}} to='/partnerprofile'>EcoFit </Link>
            </Button>
            <Button type="button" className={classes.button}> <Link className={classes.links} style={{ textDecoration: 'none' }} to='/joinus'>Join</Link>
            </Button>
            <Button type="button" className={classes.button}> <Link className={classes.links} style={{ textDecoration: 'none' }} to='/partners'> Gyms</Link>
            </Button>
            <Button type="button" className={classes.button} onClick={this.logout}>Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

Navbarpage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withRouter((withStyles(styles)(Navbarpage)));
