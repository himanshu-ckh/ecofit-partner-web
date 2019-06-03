import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Data from '../upcomingvisit.js';
import img from '../staticfiles/img3.jpeg';
import { Auth, API } from "aws-amplify";
import { Server } from 'tls';
import '../App.css'
import { ConsoleLogger } from '@aws-amplify/core';
import FileBase64 from 'react-file-base64';
import DATAGYM from '../datagym.js';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';


const styles = theme => ({
  cardmain: {
    display: 'flex',
    marginTop: 10,
    width: '75%',
    height: '40%',
    maxHeight: '100%',
    marginBottom: 20,
    marginLeft: '12%',
    marginRight: '4%',
    display: 'inlineBlock'
  },
  main: {
    display: 'inlineBlock',
    margin: 0,
  },
  media: {
    height: '100%',
    width: '100%',
    paddingTop: '56.25%',

  },
  uploadfile: {
    marginTop: 20,
    width: '90%',
    textAlign: 'center',
    jusifyContent: 'center',
  },
});


class PartnerProfileLeftTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      image: '',
      user: {},
      userData: {
        images: {
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          profile: null,
        }
      },
      uploadImageResponse: {},
      files: [],
      Data: DATAGYM,
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
      console.log(this.props.user);
    let apiName = 'PartnerService';
    let path = '/PartnerServiceGetUserDetailsLambda';
    let myInit = { // OPTIONAL
      queryStringParameters: {
        'username': this.props.user.attributes.email
      },
      headers: {
        'Authorization': this.props.user.signInUserSession.accessToken.jwtToken,
      }
    }
    API.get(apiName, path, myInit).then(response => {
      // console.log(this.state.data);
      // Add your code here
      this.setState({
        userData: response.body,
      });
      console.log(this.state.userData);
      this.render();
    }).catch(error => {
      console.log(error)
    });
  }

  getFiles = (event, filename) => {
    console.log(event)
    this.setState({ files: event[0] })
    console.log(this.state.files);
    this.uploadImage(filename, this.state.files.base64, this.props.user);
  }

  uploadImage = (filename, file, user) => {
    let apiName = 'PartnerService';
    let path = '/PartnerServiceUploadImageLambda';
    console.log("Hello");
    file = file.split(',').pop();
    console.log(filename);
    console.log(file);
    let myInit = { // OPTIONAL
      body: {
        'username': user.attributes.email,
        'type': 'portfolio',
        'fileName': filename,
        'base64EncodedString': file,
      },
      headers: {
        'Authorization': user.signInUserSession.accessToken.jwtToken,
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      }
    }
    API.post(apiName, path, myInit).then(response => {
      // console.log(this.state.data);
      // Add your code here
      this.setState({
        uploadImageResponse: response,
      });
      console.log(this.state.uploadImageResponse);
      this.render();
    }).catch(error => {
      console.log(error)
    });
  }

  renderGymData = (classes) => {
      return(
    <div className={classes.main}>
      <div className={classes.card}>
      {this.state.Data.map(p =>
      <Card key={p.id} className={classes.cardmain}>
        {this.checkIfImageIsUploaded(classes, 'profile')}
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
      <CardContent>
        <Typography className={classes.cardcontent} component="p">
          {p.openingHour}
        </Typography>
        
      </CardContent>
      <CardContent>
        <Typography className={classes.cardcontent} component="p">
          {p.closingHour}
        </Typography>
        
      </CardContent>
      </Card>
      
      )}
      </div>
      </div>
    )
  
}

  checkIfImageIsUploaded(classes, filename) {
    if (this.state.userData.images[filename] != null) {
      return (
        <div className={classes.main}>
          <Card className={classes.cardmain}>
            <CardMedia
              className={classes.media}
              image={this.state.userData.images[filename]}
              title="Gym Image"
            />
            <div className="upload-btn-wrapper">
              <button className="btn">Edit</button>
              <FileBase64
              multiple={true}
              onDone={event => this.getFiles(event, filename)} />
            </div>
           
          </Card>
        </div>
      );
    }
    else {
      return (
        <div className={classes.main}>
        <Card className={classes.cardmain}>
          <div className="upload-btn-wrapper">
              <button className="btn">Upload</button>
              <FileBase64
              multiple={true}
              onDone={event => this.getFiles(event, filename)} />
            </div>
            
            </Card>
        </div>
      );
    }
  }


  render() {
    const { classes, theme } = this.props;


    return (
      <div>
        
        {this.renderGymData(classes)}
      </div>
    )


  }
}

PartnerProfileLeftTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerProfileLeftTab);
