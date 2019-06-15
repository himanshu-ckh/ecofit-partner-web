import MainProfilePage from "./mainprofilepage";
import VisitHistory from "./visithistory";
import UpComing from "./upcoming";
import ProfileImages from "./profileimages";

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { API } from "aws-amplify";

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
    marginLeft: "1%"
  }
});

class SideTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      upcomingFilteredResult: [],
      upcomingvisitsdata: [],
      checkupcomingvisit: null,
      previousFilteredResult: [],
      previousvistsdata: [],
      checkpreviousvisits: null,
      searchupcoming: "",
      searchprevious: "",
      check: []
    };
  }

  componentDidUpdate() {
    if (this.props.user.signInUserSession.accessToken.jwtToken) {
      this.getUpComingVisits();
      this.getPreviousVisits();
    }
  }

  getUpComingVisits = () => {
    if (this.state.checkupcomingvisit == null) {
      let apiName = "PartnerService";
      let path = "/PartnerServiceGetUpcomingVisitsLambda";
      let myInit = {
        // OPTIONAL
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
            upcomingvisitsdata: response.body,
            checkupcomingvisit: true,
            upcomingFilteredResult: response.body
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  getPreviousVisits = () => {
    if (this.state.checkupcomingvisit == null) {
      let apiName = "PartnerService";
      let path = "/PartnerServiceGetPreviousVisitsLambda";
      let myInit = {
        // OPTIONAL
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
            previousvistsdata: response.body,
            checkpreviousvisits: true,
            previousFilteredResult: response.body
          });
          let previousVisitsListData = [];
          this.state.previousFilteredResult.map(
            filteredListForJustVisistData => {
              filteredListForJustVisistData.visits.map(name => {
                previousVisitsListData.push(name);
              });
            }
          );
          this.setState({
            previousFilteredResult: previousVisitsListData,
            previousvistsdata: previousVisitsListData
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  showSearchedResultUpComing = value => {
    var upcomingFilteredobj = this.state.upcomingvisitsdata.filter(
      filteredResultWithMatchingNameUpComing => {
        return filteredResultWithMatchingNameUpComing.customerName
          .toLowerCase()
          .includes(value);
      }
    );
    this.setState({ upcomingFilteredResult: upcomingFilteredobj });
  };

  handleChangeUpComing = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      function() {
        this.showSearchedResultUpComing(this.state.searchupcoming);
      }
    );
  };

  showSearchedResultPreviousVisits = value => {
    var previousVisitFilteredobj = this.state.previousvistsdata.filter(
      filteredResultWithMatchingNamePrevious => {
        return filteredResultWithMatchingNamePrevious.customerName
          .toLowerCase()
          .includes(value);
      }
    );
    this.setState({ previousFilteredResult: previousVisitFilteredobj });
  };

  handleChangePreviousVisits = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      function() {
        this.showSearchedResultPreviousVisits(this.state.searchprevious);
      }
    );
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab label="Up Coming" />
            <Tab label="History" />
            <Tab label="Profile" />
            <Tab label="Images" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <UpComing
              user={this.props.user}
              history={this.props.history}
              filteredResult={this.state.upcomingFilteredResult}
              upcomingvisitsdata={this.state.upcomingvisitsdata}
              handleChangeUpComing={this.handleChangeUpComing}
            />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <VisitHistory
              user={this.props.user}
              history={this.props.history}
              filteredResult={this.state.previousFilteredResult}
              upcomingvisitsdata={this.state.previousvistsdata}
              handleChangePrevious={this.handleChangePreviousVisits}
            />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <MainProfilePage />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <ProfileImages
              user={this.props.user}
              history={this.props.history}
            />
          </TabContainer>
        )}
      </div>
    );
  }
}

SideTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideTab);
