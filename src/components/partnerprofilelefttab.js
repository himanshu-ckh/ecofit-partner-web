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

const styles = theme => ({
  cardmain: {
    flexGrow: 1,
    marginTop: 10,
    width: "70%",
    height: "40%",
    maxHeight: "100%",
    marginBottom: 20,
    marginLeft: "2%",
    marginRight: "1%",
    display: "inlineBlock"
  },
  main: {
    //margin: 0
  },
  media: {
    maxHeight: "100%",
    maxWidth: "100%",
    paddingTop: "60.25%",
  },
  uploadfile: {
    marginTop: 20,
    width: "90%",
    textAlign: "center",
    jusifyContent: "center"
  }
});

class PartnerProfileLeftTab extends React.Component {
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
    console.log(event);
    this.setState({ files: event[0] });
    console.log(this.state.files);
    this.uploadImage(filename, this.state.files.base64, this.props.user);
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
        <div >
          <Card>
            <CardMedia
              className={classes.media}
              image={this.state.userData.images[filename]}
              title="Gym Image"
            />
            <div className="upload-btn-wrapper">
              <button className="btn">Edit</button>
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
              <button className="btn">Upload</button>
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
      <div className={classes.main}>
        <div className={classes.card}>
          {this.state.Data.map(p => (
            <Card key={p.id} className={classes.cardmain}>
              {this.checkIfImageIsUploaded(classes, "profile")}
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
          ))}
        </div>
      </div>
    );
  };


  render() {
    const { classes } = this.props;

    return <div>{this.renderGymData(classes)}</div>;
  }
}

PartnerProfileLeftTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PartnerProfileLeftTab);
