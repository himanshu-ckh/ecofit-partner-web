import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Auth } from 'aws-amplify'

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
  },
  logoutbutton: {
    color: 'white',
    justifyContent: 'right',
    marginRight: 20,
  }
};

class Navbarpage extends React.Component{

  logout = async () => {
    const logoutFlag = window.confirm("Do you want to logout?");
    if(logoutFlag === true){
    return (
    Auth.signOut()
    .then(data => {
      this.props.history.push("/partnersignin?redirect=/");
    })
    .catch(err => console.log(err)));
  }
}

  render(){
  const { classes } = this.props;

  return (
    <div className={classes.navbardiv}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <Button type="button" className={classes.button}> <Link className={classes.links} style={{ textDecoration: 'none'}} to='/'>EcoFit </Link>
            </Button>
            <Button type="button" className={classes.logoutbutton} onClick={this.logout}>Logout
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
