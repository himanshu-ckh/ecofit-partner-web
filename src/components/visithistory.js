import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  card: {
    display: "flex",
    marginTop: 10,
    width: "85%",
    height: "40%",
    maxHeight: "100%",
    marginBottom: 20,
    marginLeft: "7%"
  },
  main: {
    display: "inlineBlock",
    margin: 0
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "48%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    marginTop: 5,
    marginRight: "5%",
    marginBottom: 5,
    marginLeft: "17%",
    width: 150,
    height: 150,
    borderRadius: "50%",
    justifyContent: "right"
  },
  search: {
    width: "80%",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

class VisitHistory extends React.Component {
  state = {
    expanded: false,
    idval: false,
  };

  renderUpcomingVisitCard = (classes, theme) => {
    return (
      <div className={classes.main}>
        {this.props.filteredResult.map(previousVisits => (
              <Card key={previousVisits.visitId} className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography variant="subtitle1" color="default">
                      {previousVisits.customerName}
                    </Typography>
                    <Typography variant="subtitle1" color="default">
                      {previousVisits.dateOfVisit}
                    </Typography>
                    <Typography variant="subtitle1" color="default">
                      {previousVisits.customerPhoneNumber}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={"https://ecofit-customers.s3.ap-south-1.amazonaws.com/user_" + previousVisits.customerPhoneNumber.substr(3) + "/profile_pic.jpg"+"?time="+new Date()}
                  title="User Image"
                />
              </Card>
            )
        )}
      </div>
    );
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.main}>
        <form className={classes.form}>
          <TextField
            id="outlined-email-input"
            label="Search Visits"
            className={classes.search}
            type="search"
            name="searchprevious"
            onChange={this.props.handleChangePrevious("searchprevious")}
            margin="normal"
            variant="outlined"
          />
        </form>
        {this.renderUpcomingVisitCard(classes, theme)}
      </div>
    );
  }
}

VisitHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VisitHistory);
