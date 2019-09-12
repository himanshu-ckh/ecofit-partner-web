import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Data from "../upcomingvisit.js";
import { API } from "aws-amplify";
import "../App.css";
import FileBase64 from "react-file-base64";
import { Carousel } from 'react-bootstrap';

const styles = () => ({
  cardmain: {
    marginTop: 10,
    width: "95%",
    height: "100%",
    marginBottom: 20,
    marginLeft: "4%",
    marginRight: "4%",
    display: "inlineBlock"
  },
  media: {
    width: 'auto',
    height: 'auto',
    maxHeight: "100%",
    maxWidth: "100%",
    paddingTop: "100%"
  },
  uploadfile: {
    marginTop: 20,
    width: "90%",
    textAlign: "center",
    jusifyContent: "center"
  }
});

class ProfileImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      image: "",
      user: {},
      userData: {
        images: {
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          profile: null
        }
      },
      uploadImageResponse: {},
      files: []
    };
  }

  componentDidMount() {
    let apiName = "PartnerService";
    let path = "/PartnerServiceGetUserDetailsLambda";
    let myInit = {
      queryStringParameters: {
        username: this.props.user.attributes.email
      },
      headers: {
        Authorization: this.props.user.signInUserSession.accessToken.jwtToken
      }
    };
    API.get(apiName, path, myInit)
      .then(response => {
        this.setState({
          userData: response.body
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFiles = (event, filename) => {
    this.setState({ files: event[0] });
    if(this.state.files.name.split('.')[1]==="jpeg" || this.state.files.name.split('.')[1]==="jpg" || this.state.files.name.split('.')[1]==="png") {
      
    this.uploadImage(filename, this.state.files.base64, this.props.user);
    }
    else {
      alert("Please select a file with .jpeg or .png or .jpg format")
    }
  };

  uploadImage = (filename, file, user) => {
    let apiName = "PartnerService";
    let path = "/PartnerServiceUploadImageLambda";
    file = file.split(",").pop();
    let myInit = {
      body: {
        username: user.attributes.email,
        type: "portfolio",
        fileName: filename,
        base64EncodedString: file
      },
      headers: {
        Authorization: user.signInUserSession.accessToken.jwtToken,
        "Access-Control-Allow-Origin": "*"
      }
    };
    API.post(apiName, path, myInit)
      .then(response => {
        this.setState({
          uploadImageResponse: response,
          userData: response.body.Attributes
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkIfImageIsUploaded(classes, filename) {
    if (this.state.userData.images[filename] != null) {
      return (
                <div>
                  <img
                  className="d-block w-100"
                  src={this.state.userData.images[filename]+"?time="+new Date()}
                  alt="Slides"
                />
                <Carousel.Caption>
                <div className="upload-btn-wrapper">
                  <button className="btn">Edit      <i className="far fa-edit"></i></button>
                  <FileBase64
                    multiple={true}
                    onDone={event => this.getFiles(event, filename)}
                  />
                  </div>
                </Carousel.Caption>
                </div>
                
              
      );
    } else {
      return (
        
          <Card className={classes.cardmain}>
            <div className="upload-btn-wrappers">
              <button className="btn">Upload     <i className="fa fa-upload" aria-hidden="true"></i></button>
              <FileBase64
                multiple={true}
                onDone={event => this.getFiles(event, filename)}
              />
            </div>
          </Card>
      );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Carousel
        interval = '3000'>
              <Carousel.Item>
                {this.checkIfImageIsUploaded(classes, "1")}
                </Carousel.Item>
                <Carousel.Item>
                {this.checkIfImageIsUploaded(classes, "2")}
                </Carousel.Item>
                <Carousel.Item>
                {this.checkIfImageIsUploaded(classes, "3")}
                </Carousel.Item>
                <Carousel.Item>
                {this.checkIfImageIsUploaded(classes, "4")}
                </Carousel.Item>
                <Carousel.Item>
                {this.checkIfImageIsUploaded(classes, "5")}
                </Carousel.Item>
              </Carousel>
      </div>
    );
  }
}

ProfileImages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileImages);
