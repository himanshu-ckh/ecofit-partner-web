import React, { useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { API } from "aws-amplify";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const InitialState = {
    workingHours:{
        openNowOverride: null
    },
    isOpen: {
        isOpen: null,
        nextStatus: null,
    },
    dataLoadedFromAPI: null,
    gymOpenStatus: true,
    closeGymNowDialog:false,
    openGymNowDialog:false,
}

function CloseGymNow(props) {
    function reducer (state, action) {
        switch (action.type) {
            case 'getGymStatusOpenOrClose': 
                return{
                    ...state,
                    workingHours: action.response.body.workingHours,
                    isOpen: action.response.body.isOpen,
                    dataLoadedFromAPI: true
                }
            case 'setgymCloseNowStatus':
                return {
                    ...state,
                    workingHours: {
                        openNowOverride: false
                    }
                }
            case 'setgymOpenNowStatus': {
                return {
                    ...state,
                    workingHours:{
                        openNowOverride: true
                    }
                }
            }
            case 'closeGymNowDialog': {
                return {
                    ...state,
                    closeGymNowDialog: true
                }
            }
            case 'closeModalGym': {
                return {
                    ...state,
                    closeGymNowDialog: false
                }
            }

            case 'closeModal': {
                return {
                    ...state,
                    closeGymNowDialog: false
                }
            }

            case 'openGymNowDialog': {
                return {
                    ...state,
                    openGymNowDialog: true
                }
            }

            case 'closeModalGym2': {
                return {
                    ...state,
                    openGymNowDialog: false
                }
            }
            default:
        }
    }
    const [state, dispatch] = useReducer(reducer, InitialState)

    const styles = theme =>({
        button: {
            margin: theme.spacing(1),
          },
          input: {
            display: 'none',
          },
    })

    const setgymCloseNowStatus = () => {
        dispatch({type: 'setgymCloseNowStatus'})
    }

    const setgymOpenNowStatus = () => {
        dispatch({type: 'setgymOpenNowStatus'})
    }

    const handeleCloseNowButton = (e) => {
        e.preventDefault();
        dispatch({type: 'closeGymNowDialog'})   
    }

    const handeleOpenNowButton = (e) => {
        e.preventDefault();
        dispatch({type: 'openGymNowDialog'}) 
        
    }

    const handleCloseGymDisagre = (e) => {
        e.preventDefault();
        dispatch({type: 'closeModalGym'})
    }

    const handleCloseGymAgree = (e) => {
        e.preventDefault();
        setgymCloseNowStatus()
        dispatch({type: 'closeModalGym'})
    }

    const handleOpenGymDisagre = (e) => {
        e.preventDefault();
        dispatch({type: 'closeModalGym2'})
    }

    const handleOpenGymAgree = (e) => {
        e.preventDefault();
        setgymOpenNowStatus()
        dispatch({type: 'closeModalGym2'})
    }

    const getUserDetails = () => {
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
                    console.log("Got Results")
                  dispatch({type: 'getGymStatusOpenOrClose', response :response})
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
    }

    const postUserDetails = () => {
        let apiName = "PartnerService";
              let path = "/PartnerServiceUpdateWorkingHoursLambda";
              let myInit = {
                body:{
                    username: props.user.attributes.email,
                    openNowOverride: state.workingHours.openNowOverride
                },
                headers: {
                  Authorization: props.user.signInUserSession.accessToken
                    .jwtToken
                }
              };
              API.post(apiName, path, myInit)
                .then(response => {
                  console.log("Result Posted")
                })
                .catch(error => {
                  console.log(error);
                });
    }

    useEffect(() => {
        getUserDetails()
        postUserDetails()
    })

    if (state.workingHours.openNowOverride=== true || (state.workingHours.openNowOverride ===null && state.isOpen.isOpen===true)) {
        return (
            <div>
                <Button variant="outlined" color="secondary" className={styles.button} onClick={handeleCloseNowButton}>
                    Close Gym Now
                </Button>
                <Dialog
                    open={state.closeGymNowDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{'Close Gym for the Day'}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Close Gym For Whole Day!!.
                        If you need to open gym again, please select this again.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseGymDisagre} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleCloseGymAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    else if(state.workingHours.openNowOverride=== false || (state.workingHours.openNowOverride === null && state.isOpen.isOpen===false)){
        return (
            <div>
                <Button variant="contained" color="secondary" className={styles.button} onClick={handeleOpenNowButton}>
                    Open Gym Now
                </Button>
                <Dialog
                    open={state.openGymNowDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Open Gym for the day"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Open Gym for Now!!
                        Want to close the Gym again, please click the same.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleOpenGymDisagre} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleOpenGymAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    else {
        return(
            <div>
                <Button variant="outlined" color="secondary" className={styles.button}>
                    Checking
                </Button>
            </div>
        )
    }
}

export default CloseGymNow