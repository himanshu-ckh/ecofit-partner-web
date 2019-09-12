import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import NavbarPartnerProfile from "./navbarpartnerprofile";
import SideTab from "./sidetab";
import "../App.css";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import PartnerProfileLeftTabTest from "./partnerprofilelefttabTest";

const styles = theme => ({
  colorgrey: {
    backgroundColor: "#DCDCDC"
  },
  wrappingdiv: {
    // margin: "auto",
    width: "100%",
    // display: "flex",
    // flexWrap: "wrap",
    overflow:'hidden',
    
  },
  lefttab: {
    // width: "39%",
    // maxWidth: "100%",
    marginTop: "1%",
    marginLeft: "5%",
    marginRight: '5%',
    float:'left', 
    [theme.breakpoints.up('lg')]: {
      width:'35%',
      // marginLeft: '5%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width:'35%',
      // marginLeft: '5%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      float: 'none',
    // marginRight:0,
    width:'auto',
    // marginLeft:'7%',
    },
    [theme.breakpoints.down('sm')]: {
      // width:'140%',
      // marginLeft: '14%',
      // wordWrap: 'break-word'
      float: 'none',
    // marginRight:0,
    width:'auto',
    // marginLeft:'16%',
    },

  },
  sidetab: {
    // width: "80%",
    // maxWidth: "100%",
    marginRight: '5%',
    marginTop: "1.5%",
    marginLeft: "5%",
    overflow:'hidden',
    [theme.breakpoints.between('md', 'lg')]: {
      // width:'54%',
      // marginRight: '5%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      // width: '85%',
      // maxWidth:'100%',
      // marginLeft:'17%',
    },
    [theme.breakpoints.down('sm')]: {
    //   float: 'none',
    // marginRight:0,
    // width:'auto'
    },

  }
});

class PartnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      image: "",
      user: {},
      isLoggedIn: {}
    };
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          user: user,
          isLoggedIn: true
        });
      })
      .catch(err => {
        this.setState({ isLoggedIn: false });
      });
    if (!this.state.isLoggedIn) {
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
        <div className={classes.wrappingdiv}>
          <div className={classes.lefttab}>
            <PartnerProfileLeftTabTest
              user={this.props.user}
              history={this.props.history}
            />
          </div>
          <div className={classes.sidetab}>
            <SideTab user={this.props.user} history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

PartnerProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PartnerProfile));
