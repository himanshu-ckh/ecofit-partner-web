import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Data from '../upcomingvisit.js';
import {  API } from "aws-amplify";
import '../App.css'
import FileBase64 from 'react-file-base64';


const styles = theme => ({
  cardmain: {
    display: 'flex',
    marginTop: 10,
    width: '95%',
    height: '100%',
    marginBottom: 20,
    marginLeft: '4%',
    marginRight: '4%',
    display: 'inlineBlock'
  },
  main: {
    display: 'inlineBlock',
    margin: 0,
  },
  media: {
    maxHeight: '100%',
    maxWidth: '100%',
    jusifyContent: 'center',
    paddingTop: '56.25%',
    alignItems: 'center',
  },
  uploadfile: {
    marginTop: 20,
    width: '90%',
    textAlign: 'center',
    jusifyContent: 'center',
  },
});


class ProfileImages extends React.Component {

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
      files: []
    }
  }

  componentDidMount() {
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
      }).catch(error => {
        console.log(error)
      });
  }

  getFiles = (event, filename) => {
    this.setState({ files: event[0] })
    this.uploadImage(filename, this.state.files.base64, this.props.user);
  }

  uploadImage = (filename, file, user) => {
    let apiName = 'PartnerService';
    let path = '/PartnerServiceUploadImageLambda';
    file = file.split(',').pop();
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
    API.post(apiName, path, myInit)
    .then(response => {
      this.setState({
        uploadImageResponse: response,
        userData: response.body.Attributes,
      });
      console.log(response);
    }).catch(error => {
      console.log(error)
    });
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
    const { classes} = this.props;

    return (
      <div>
        {this.checkIfImageIsUploaded(classes, '1')}
        {this.checkIfImageIsUploaded(classes, '2')}
        {this.checkIfImageIsUploaded(classes, '3')}
        {this.checkIfImageIsUploaded(classes, '4')}
        {this.checkIfImageIsUploaded(classes, '5')}
      </div>
    )
  }
}

ProfileImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileImages);
