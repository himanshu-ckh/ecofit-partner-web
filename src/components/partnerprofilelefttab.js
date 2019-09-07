import React, { useReducer, useEffect} from 'react'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { API } from "aws-amplify";
import Modal from "./modal";
import CloseGymNow from './CloseGymNow'
import FileBase64 from "react-file-base64";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
    }
  });

const InitialState = {
    dataLoadedFromAPI: null,
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
    files: {
      base64: null
    },
    uploadImageResponse: null,
    open: false,

}

function reducer(state,action) {
    switch(action.type) {
        case 'getPartnerData':
            return {
                ...state,
                userData: action.response.body,
                dataLoadedFromAPI: true
            }
            break;
        case 'setFiles':
          console.log(action.data)
            return {
                ...state,
                files: action.data.base64
            }
            break;
        case 'uploadmageResponseData':
            return {
                ...state,
                uploadImageResponse: action.response
            }
            break;
    }
}

function PartnerProfileLeftTab(props) {
    const [state,dispatch] = useReducer(reducer, InitialState)

    const getLeftTabData = () => {
        if (props.user.signInUserSession.accessToken.jwtToken) {
            if (state.dataLoadedFromAPI == null) {
              let apiName = "PartnerService";
              let path = "/PartnerServiceGetUserDetailsLambda";
              let myInit = {
                // OPTIONAL
                queryStringParameters: {
                  username: props.user.attributes.email
                },
                headers: {
                  Authorization: props.user.signInUserSession.accessToken
                    .jwtToken
                }
              };
              API.get(apiName, path, myInit)
                .then(response => {
                    dispatch({type: 'getPartnerData', response: response})
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
    }

    useEffect(()=> {
        getLeftTabData();
    })

    const uploadImage = (filename, file, user) => {
        let apiName = "PartnerService";
        let path = "/PartnerServiceUploadImageLambda";
        file = file.split(",").pop();
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
            dispatch({
                type: 'uploadmageResponseData',
                data: response
            })
            // this.setState({
            // uploadImageResponse: response,
            // userData: response.body.Attributes
            // });
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getFiles = (event, filename) => {
        dispatch({type: 'setFiles', data: event[0]})
        uploadImage(filename, state.files.base64, props.user);
      };

    const checkIfImageIsUploaded = (classes, filename) => {
    if (state.userData.images[filename] != null) {
      return (
        <div>
          <Card>
            <CardMedia
              className={classes.media}
              image={
                state.userData.images[filename] + "?time=" + new Date()
              }
              title="Gym Image"
            />
            <div className="upload-btn-wrapper">
              <button className="btn">Edit  <i className="far fa-edit"></i></button>
              <FileBase64
                multiple={true}
                onDone={event => getFiles(event, filename)}
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
                onDone={event => getFiles(event, filename)}
              />
            </div>
          </Card>
        </div>
      );
    }
    }

    const renderGymData = (classes) => {
        return (
            <div>
                <Card key={state.userData.id} className={classes.cardmain}>
                  {checkIfImageIsUploaded(classes, "profile")}
                  <div className={classes.maincardcontentclass}>
                  <CardContent >
                    <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="p">
                      {state.userData.name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="p">
                      {state.userData.address}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="p">
                      {state.userData.phoneNumber}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom className={classes.cardcontent} component="p">
                      {state.userData.city}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <CloseGymNow/>
                  </CardContent>
                  <CardContent>
                  <Modal user={props.user} userData={state.userData} />
                  </CardContent>
                  </div>
                </Card>
            </div>
        );
    }

    return (
        <div>
            {renderGymData(props.classes)}
        </div>
    )
}

PartnerProfileLeftTab.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(PartnerProfileLeftTab)
