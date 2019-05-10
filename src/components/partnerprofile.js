import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import NavbarPartnerProfile from './navbarpartnerprofile';
import SideTab from './sidetab';
import '../App.css';
import DATAGYM from '../datagym.js';
import axios, {post} from 'axios';
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";


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
  }
});

class PartnerProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false, 
      Data: DATAGYM,
      image: ''
    }
    this.getCurrentAuthUser();
  }

  getCurrentAuthUser = async () => {
    let isLoggedIn = false;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        isLoggedIn = true;
      })
      .catch(err => {
        isLoggedIn = false;
      });
      if (!isLoggedIn) {
        console.log("pushing to redirect partnersign in url");
        this.props.history.push("/partnersignin?redirect=/");
      }
  };


  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  renderGymProfileOnPartnerPage = (classes) => {
    return(
    <div className={classes.main}>
      <div className={classes.card}>
      {this.state.Data.map(p =>
      <Card className={classes.cardmain}>
        <CardMedia
          className={classes.media}
          image={p.image}
          title="Gym Image"
          
        />
        {/* <input type="file" name =" file" onChange={(e) => this.onChange(e)} /> */}
        <CardContent>
        <Typography className={classes.cardcontent} component="p">
          {p.name}
        </Typography>
      </CardContent>
        <CardContent>
          <Typography className={classes.cardcontent} component="p">
            {p.address}
          </Typography>
          </CardContent>
          <CardContent>
          <Typography className={classes.cardcontent} component="p">
            {p.phoneNumber}
          </Typography>
        </CardContent>
        <CardContent>
        <Typography className={classes.cardcontent} component="p">
          {p.city}
        </Typography>
        
      </CardContent>
      </Card>
      
      )}
      </div>
      <div className={classes.sidetab}>
      <SideTab />
      </div>
      </div>
    )
  }

  // onChange(e) {
  //   let files = e.target.files;
  //   let reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload= (e) =>{
  //     console.log(e.target.result);
  //     const url = "aws url";
  //     const formData = {file: e.target.result}; 
  //     return post(url, formData)
  //     .then(response =>{
  //       console.log("result", response);
  //     })
  //   } 
  // }
    

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.colorgrey}>
      <NavbarPartnerProfile />
      
      {this.renderGymProfileOnPartnerPage(classes)}
      
      </div>
    );
  }
}

PartnerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PartnerProfile));
