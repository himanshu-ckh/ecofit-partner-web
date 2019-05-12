import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Data from '../upcomingvisit.js';
import img from '../staticfiles/img3.jpeg';
import { Auth, API } from "aws-amplify";
import { Server } from 'tls';


const styles = theme => ({
  cardmain: {
    display: 'flex',
    marginTop: 10,
    width: '95%',
    height: '40%',
    maxHeight: '100%',
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
    height: '100%',
    width: '100%',
    paddingTop: '56.25%',

  },
  uploadfile: {
    marginTop: 20,
    width: '90%',
    textAlign: 'center',
    jusifyContent: 'center'
  }
});


class ProfileImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      data: Data,
      idval: false,
      imageUploaded1: false,
      image: '',
      imageUploaded2: false,
      imageUploaded3: false,
      imageUploaded4: false,
      imageUploaded5: false,
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
    }


  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
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


  onSubmitChangeone = (evt, filename) => {
    evt.preventDefault();
    console.log("Uploading");
    console.log(evt);
    var self = this;
    var reader = new FileReader();
    console.log(evt.target.files);
    var file = evt.target.files[0];

    if (evt.target.files[0].size < 307200) {
      reader.onload = function (upload) {
        self.setState({
          image: upload.target.result
        }, function () {
          console.log(this.state.image.split(',').pop());

        });
      }
      this.uploadImage(filename);
    }
    else {
      alert("File size is too Big, please try another file")
    }
    reader.readAsDataURL(file);
    console.log(this.state.image);
    console.log("Uploaded");
  }

  uploadImage(filename) {
    let apiName = 'PartnerService';
    let path = '/PartnerServiceUploadImageLambda';
    let myInit = { // OPTIONAL
      body: {
        'username': this.props.user.attributes.email,
        'type': 'portfolio',
        'fileName': filename,
        'base64EncodedString': this.state.image.split(',').pop(),
      },
      headers: {
        'Authorization': this.props.user.signInUserSession.accessToken.jwtToken,
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
          </Card>
        </div>
      );
    }
    else {
      return (
        <div className={classes.main}>
          <Card className={classes.cardmain}>
            <input ref="file" type="file" name="file"
              className={classes.uploadfile}
              id="file1"
              onChange={event => this.onSubmitChangeone(event, filename)}
              encType="multipart/form-data"
              required />
          </Card>
        </div>
      );
    }
  }


  render() {
    const { classes, theme } = this.props;


    return (
      <div>
        {this.checkIfImageIsUploaded(classes, '1')}
        {this.checkIfImageIsUploaded(classes, '2')}
        {this.checkIfImageIsUploaded(classes, '3')}
        {this.checkIfImageIsUploaded(classes, '4')}
        {this.checkIfImageIsUploaded(classes, '5')}
        {

        }
      </div>
    )


  }
}

ProfileImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileImages);
