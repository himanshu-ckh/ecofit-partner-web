import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  card: {
    display: "flex",
    marginTop: 10,
    width: "75%",
    height: "40%",
    maxHeight: "100%",
    marginBottom: 20,
    marginLeft: "12%",
    boxShadow: '3px 3px 3px 3px lightgrey',
    [theme.breakpoints.down('sm')]: {
      width:'80%',
    },
  },
  main: {
    display: "inlineBlock",
    margin: 0
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
    [theme.breakpoints.down('sm')]: {
      maxWidth:'30%',
    },
  },
  content: {
    flex: "1 0 auto",
    textAlign: 'left',
    marginLeft: '10%'
  },
  cover: {
    marginTop: 15,
    marginRight: "5%",
    marginBottom: 5,
    marginLeft: "5%",
    width: 90,
    height: 90,
    borderRadius: "50%",
    justifyContent: "right",
    [theme.breakpoints.down('sm')]: {
      maxWidth:'100%',
      marginLeft:'2%',
      width: 50,
      height: 50
    },
  },
  search: {
    width: "80%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
});

class VisitHistory extends React.Component {
  state = {
    expanded: false,
    idval: false,
    open: true
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  renderPreviousVisitCard = (classes, theme) => {

    return (
      <div className={classes.main}>
        <Snackbar
        open={this.state.open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Visit History</span>}
      />
        {this.props.filteredResult.map(previousVisits => (
              <Card key={previousVisits.visitId} className={classes.card}>
                <CardMedia
                  className={classes.cover}
                  image={`https://ecofit-customers.s3.ap-south-1.amazonaws.com/user_${previousVisits.customerPhoneNumber.substr(3)}/profile_pic.jpg?time=${new Date()}`}
                  title="User Image"
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography variant="h6" gutterBottom>
                      {previousVisits.customerName}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {previousVisits.customerPhoneNumber}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {previousVisits.dateOfVisit}
                    </Typography>
                  </CardContent>
                </div>

                
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
            color="secondary"
          />
        </form>
        {this.renderPreviousVisitCard(classes, theme)}
      </div>
    );
  }
}

VisitHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VisitHistory);
