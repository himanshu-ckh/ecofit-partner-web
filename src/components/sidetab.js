import React, {useEffect, useReducer } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { API } from "aws-amplify";
import UpComing from "./upcoming";
import VisitHistory from "./visithistory";
import ProfileImages from "./profileimages";
import Audit from './Audit'
import MainProfilePageTest from "./mainprofilepagetest";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "inlineBlock",
    marginLeft: "1%",
    boxShadow: '5px 5px 5px 5px lightgrey'
  }
});

const InitialState = {
  value: 0,
  upcomingFilteredResult: [],
  upcomingvisitsdata: [],
  checkupcomingvisit: null,
  previousFilteredResult: [],
  previousvistsdata: [],
  checkpreviousvisits: null,
  searchupcoming: "",
  searchprevious: "",
  check: [],
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
dataLoadedFromAPI: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'handleTabChange':
      return {
        ...state, value: action.value
      }
    case 'renderUpComingVisit':
      return {
        ...state,
        upcomingvisitsdata: action.response.body,
        checkupcomingvisit: true,
        upcomingFilteredResult: action.response.body
      }
    case 'updateSearchUpComing':
      return {
        ...state,
        searchupcoming: action.name
      }
    case 'updateupcomingFilteredResult':
      return {
        ...state,
        upcomingFilteredResult: action.value
      }
    case 'renderPreviousVisit':
      return {
        ...state,
        previousvistsdata: action.response.body,
        checkpreviousvisits: true,
        previousFilteredResult: action.response.body
      }
    case 'updateSearchPrevious':
      return {
        ...state,
        searchprevious: action.name
      }
    case 'renderPreviousMapVisit':
      return {
        ...state,
        previousFilteredResult: action.previousFilteredResultData,
        previousvistsdata: action.previousFilteredResultData
      }
    case 'updatePreviousFilteredResult':
      return {
        ...state,
        previousFilteredResult: action.value
      }
    case 'getPartnerData':
          return {
              ...state,
              userData: action.response.body,
              dataLoadedFromAPI: true
          }
    default:
  }
}

function SideTabTest(props) {
  const [state, dispatch] = useReducer(reducer, InitialState)

  const showSearchedResultUpComing = (value) => {
    var upcomingFilteredobj = state.upcomingvisitsdata.filter(
      filteredResultWithMatchingNameUpComing => {
        return (filteredResultWithMatchingNameUpComing.customerName
          .toLowerCase()
          .includes(value) |
          filteredResultWithMatchingNameUpComing.customerPhoneNumber
            .toLowerCase()
            .includes(value) |
          filteredResultWithMatchingNameUpComing.dateOfVisit
            .toLowerCase()
            .includes(value));
      }
    );
    dispatch({ type: 'updateupcomingFilteredResult', value: upcomingFilteredobj });
  }

  const showSearchedResultPreviousVisits = value => {
    let previousVisitFilteredobj = state.previousvistsdata.filter(
      filteredResultWithMatchingNamePrevious => {
        return (filteredResultWithMatchingNamePrevious.customerName
          .toLowerCase()
          .includes(value) |
          filteredResultWithMatchingNamePrevious.customerPhoneNumber
            .toLowerCase()
            .includes(value) |
          filteredResultWithMatchingNamePrevious.dateOfVisit
            .toLowerCase()
            .includes(value));
      }
    );
    dispatch({ type: 'updatePreviousFilteredResult', value: previousVisitFilteredobj });
  };

  const handleTabChange = (event, value) => {
    dispatch({ type: 'handleTabChange', value: value })
  }

  const getUpComingVisits = () => {
    if (state.checkupcomingvisit == null) {
      let apiName = "PartnerService";
      let path = "/PartnerServiceGetUpcomingVisitsLambda";
      let myInit = {
        queryStringParameters: {
          username: props.user.attributes.email
        },
        headers: {
          Authorization: props.user.signInUserSession.accessToken.jwtToken
        }
      };
      API.get(apiName, path, myInit)
        .then(response => {
          dispatch({ type: 'renderUpComingVisit', response: response });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const getPreviousVisits = () => {
    if (state.checkpreviousvisits == null) {
      let apiName = "PartnerService";
      let path = "/PartnerServiceGetPreviousVisitsLambda";
      let myInit = {
        // OPTIONAL
        queryStringParameters: {
          username: props.user.attributes.email
        },
        headers: {
          Authorization: props.user.signInUserSession.accessToken.jwtToken
        }
      };
      API.get(apiName, path, myInit)
        .then(response => {
          dispatch({ type: 'renderPreviousVisit', response: response });
          let previousVisitsListData = [];
          let previousFilteredResultMapFunc = response.body;
          previousFilteredResultMapFunc.map(
            filteredListForJustVisistData => {
              return(filteredListForJustVisistData.visits.map(name => {
                return (previousVisitsListData.push(name))
              }))
            }
          );
          dispatch({ type: 'renderPreviousMapVisit', previousFilteredResultData: previousVisitsListData });
        })
        .catch(error => {
          console.log(error);
        });

    }
  }

  const handleChangeUpComing = event => {
    dispatch({ type: 'updateSearchUpComing', name: event.target.value });
    showSearchedResultUpComing(event.target.value);
  }

  const handleChangePreviousVisits = event => {
    dispatch({ type: 'updateSearchPrevious', name: event.target.value });
    showSearchedResultPreviousVisits(event.target.value);
  };

  const getUserData = () => {
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

  useEffect(() => {
    getUpComingVisits();
    getPreviousVisits();
    getUserData();
  })

  return (
    <div className={props.classes.root}>
      <AppBar position="static" variant="outlined" color="default">
        <Tabs
          value={state.value}
          onChange={(event, value) => handleTabChange(event, value)}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="Up Coming" />
          <Tab label="History" />
          <Tab label="Profile" />
          <Tab label="Images" />
          <Tab label="Audit" />
        </Tabs>
      </AppBar>
      {state.value === 0 && (
        <TabContainer>
          <UpComing
            user={props.user}
            history={props.history}
            filteredResult={state.upcomingFilteredResult}
            upcomingvisitsdata={state.upcomingvisitsdata}
            handleChangeUpComing={() => handleChangeUpComing}
          />
        </TabContainer>
      )}
      {state.value === 1 && (
        <TabContainer>
          <VisitHistory
            user={props.user}
            history={props.history}
            filteredResult={state.previousFilteredResult}
            upcomingvisitsdata={state.previousvistsdata}
            handleChangePrevious={() => handleChangePreviousVisits}
          />
        </TabContainer>
      )}
      {state.value === 2 && (
        <TabContainer>
          <MainProfilePageTest 
          user={props.user}
          history={props.history}
          userData = {state.userData}
          />
        </TabContainer>
      )}
      {state.value === 3 && (
        <TabContainer>
          <ProfileImages
            user={props.user}
            history={props.history}
            userData = {state.userData}
          />
        </TabContainer>
      )}
      {state.value === 4  && (
        <TabContainer>
          <Audit
            user={props.user}
            history={props.history}
          />
        </TabContainer>
      )}
    </div>
  )
}

SideTabTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideTabTest)
