import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Data from "../upcomingvisit.js";
import { API } from "aws-amplify";
import "../App.css";
import FileBase64 from "react-file-base64";
import DATAGYM from "../datagym.js";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CloseGymNow from './CloseGymNow'
import ModalTest from './modalTest'
import ChangePassword from './ChangePasswordInside'

const styles = theme => ({
  cardmain: {
    flexGrow: 1,
    marginTop: 10,
    width: "80%",
    height: "40%",
    maxHeight: "100%",
    marginBottom: 20,
    marginLeft: "2%",
    marginRight: "1%",
    boxShadow: '5px 5px 5px 5px lightgrey'

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
  },
  cardcontent: {
    paddingTop: '0',
    paddingBottom: '0'
  }
});

class PartnerProfileLeftTabTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      image: "",
      user: {},
      userData: {
        id: null,
        images: {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            profile: null
        },
        workingHours: {
          Monday: "0000000000000000",
          Tuesday: "0000000000000000",
          Wednesday: "0000000000000000",
          Thursday: "0000000000000000",
          Friday: "0000000000000000",
          Saturday: "0000000000000000",
          Sunday: "0000000000000000",
          openNowOverride: "0000000000000000",
        }
    },
      uploadImageResponse: {},
      files: [],
      Data: DATAGYM,
      dataLoadedFromAPI: null
    };
  }

  componentDidUpdate() {
    if (this.props.user.signInUserSession.accessToken.jwtToken) {
      if (this.state.dataLoadedFromAPI == null) {
        let apiName = "PartnerService";
        let path = "/PartnerServiceGetUserDetailsLambda";
        let myInit = {
          // OPTIONAL
          queryStringParameters: {
            username: this.props.user.attributes.email
          },
          headers: {
            Authorization: this.props.user.signInUserSession.accessToken
              .jwtToken
          }
        };
        API.get(apiName, path, myInit)
          .then(response => {
            this.setState({
              userData: response.body,
              dataLoadedFromAPI: true
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
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
    console.log("Hello");
    file = file.split(",").pop();
    console.log(filename);
    console.log(file);
    let myInit = {
      // OPTIONAL
      body: {
        username: user.attributes.email,
        type: "portfolio",
        fileName: filename,
        base64EncodedString: file
      },
      headers: {
        Authorization: user.signInUserSession.accessToken.jwtToken,
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
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
          <Card>
            <CardMedia
              className={classes.media}
              image={
                this.state.userData.images[filename] + "?time=" + new Date()
              }
              title="Gym Image"
            />
            <div className="upload-btn-wrapper">
              <button className="btn">Edit       <i className="far fa-edit"></i></button>
              <FileBase64
                multiple={true}
                onDone={event => this.getFiles(event, filename)}
              />
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className={classes.main}>
          <Card className={classes.cardmain}>
            <div className="upload-btn-wrapper">
              <button className="btn">Upload      <i className="fa fa-upload" aria-hidden="true"></i></button>
              <FileBase64
                multiple={true}
                onDone={event => this.getFiles(event, filename)}
              />
            </div>
          </Card>
        </div>
      );
    }
  }

  renderGymData = classes => {
    return (
        <div className={classes.cardDataForGymLeftSide}>
            <Card key={this.state.userData.id} className={classes.cardmain}>
              {this.checkIfImageIsUploaded(classes, "profile")}
              <CardContent>
                <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="span">
                {this.state.userData.name}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="span">
                {this.state.userData.address}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="span">
                {this.state.userData.phoneNumber}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="span">
                {this.state.userData.city}
                </Typography>
              </CardContent>
              <CardContent>
                    <CloseGymNow user={this.props.user}/>
                  </CardContent>
                  <CardContent>
                  <ModalTest user={this.props.user} userData={this.state.userData} />
                  </CardContent>
                  <CardContent>
                  <ChangePassword user={this.props.user} userData={this.state.userData} />
                  </CardContent>
            </Card>
        </div>
    );
  };

  render() {
    const { classes } = this.props;

    return <div>{this.renderGymData(classes)}</div>;
  }
}

PartnerProfileLeftTabTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PartnerProfileLeftTabTest);