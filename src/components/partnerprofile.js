import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import NavbarPartnerProfile from './navbarpartnerprofile';
import SideTab from './sidetab';
import '../App.css';
import DATAGYM from '../datagym.js';
import { withRouter } from "react-router-dom";
import { Auth} from "aws-amplify";


const styles = theme => ({
  main:{
    marginRight: '6%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: '100%',
    width: 350,
    maxHeight: '100%',
    marginLeft: '2%',
    marginTop: '1%',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '300',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardmain: {
    height: 450,
  },
  cardcontent:{
    float:'left',
  },
  sidetab:{
    width: 640,
    maxWidth: '100%',
    marginRight: '5%',
    marginTop: '1%',
    marginLeft: '1%',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 640,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  media: {
    height: 300,
    width: 300,
    paddingTop: '56.25%',
    borderRadius: '50%',
    marginTop: 10,
    marginLeft: '7%',
    marginRight: '5%',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  colorgrey: {
    backgroundColor: '#DCDCDC',
    maxWidth: '100%',
    width: '100%'
  },
  mainCard: {
    height: '50%'
  }
});

class PartnerProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false, 
      Data: DATAGYM,
      image: '',
      user: {},
      isLoggedIn: {},
    }
  }

  componentDidMount () {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          user:user,
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({isLoggedIn : false});
      });
      if (!this.state.isLoggedIn) {
        console.log("pushing to redirect partnersign in url");
        this.props.history.push("/partnersignin?redirect=/");
      }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
     
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.colorgrey}>
      <NavbarPartnerProfile />
      <div className={classes.sidetab}>
      <SideTab user={this.props.user}/>
      </div>  
      </div>
    );
  }
}

PartnerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PartnerProfile));
