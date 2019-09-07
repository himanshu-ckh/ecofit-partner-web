import React, { useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { API } from "aws-amplify";

const InitialState = {
    workingHours:{
        openNowOverride: null
    },
    isOpen: {
        isOpen: null,
        nextStatus: null,
    },
    dataLoadedFromAPI: null,
    gymOpenStatus: true
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
        setgymCloseNowStatus()
    }

    const handeleOpenNowButton = (e) => {
        e.preventDefault();
        setgymOpenNowStatus()
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
                    Close Now
                </Button>
            </div>
        )
    }
    else if(state.workingHours.openNowOverride=== false || (state.workingHours.openNowOverride === null && state.isOpen.isOpen===false)){
        return (
            <div>
                <Button variant="contained" color="secondary" className={styles.button} onClick={handeleOpenNowButton}>
                    Open Now
                </Button>
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