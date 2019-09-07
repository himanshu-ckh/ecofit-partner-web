import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Navbar from './navbar';
import { Media } from 'react-breakpoints';

const styles = theme => ({
  root: {
    width: '90%',
    paddingTop: '3%'
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit *2,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit,
  },
  resetContainer: {
    padding: theme.spacing.unit *2,
  },
  paper: {
    padding: theme.spacing.unit,
    margin: "auto",

  },
  container: {
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit *2,
    marginRight: theme.spacing.unit *2,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  becomeapartner: {
    textAlign: 'left',
    fontWeight: 500,
    fontSize: 25,
  },
  stepname: {
    backgroundColor: theme.palette.secondary.main,
  }
});

class VerticalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeStep: 0, price: 2500, loading: false, success: false, snackOpen: false, lat: ' ', long: ' ',};
    this.handleChange = this.handleChange.bind(this);
  }

  initialState = {
    activeStep: 0,
    name: '',
    phoneNumber: '',
    email: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonNumber: '',
    contactPersonDesignation: '',
    price: '2500'
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState(this.initialState);
  };

  handleSubmit = () => {

    var url = "https://9pmbfg6fn9.execute-api.ap-south-1.amazonaws.com/prod/PartnerServiceRegisterNewUserLambda/";
    var data = {
      name: this.state.name,
      phoneNumber: '+91' + this.state.phoneNumber,
      email: this.state.email,
      city: this.state.city,
      address: this.state.address,
      latitude: this.state.lat.toString(),
      longitude: this.state.long.toString(),
      contactPersonName: this.state.contactPersonName,
      contactPersonEmail: this.state.contactPersonEmail,
      contactPersonNumber: '+91' + this.state.contactPersonNumber,
      contactPersonDesignation: this.state.contactPersonDesignation,
    }
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.setState(state => ({
            result: JSON.stringify(state),
            loading: false,
            success: true,
            snackOpen: true,
          }));
          fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
        },
      );
    }
  };

  handleClickOpenTandC = () => {
    this.setState({ open: true});
  };

  handleAcceptTandC = () => {
    this.setState(state => ({
      open: false,
      activeStep: state.activeStep + 1,
    }));
  };

  handleRejectTandC = () => {
    this.setState(state => ({
      open: false,
    }));
  };

  getStepContent(step, lat, long) {
    switch (step) {
      case 0:
        return (<Paper style={{padding: 20,
        margin: "auto"}}>
          <form className={styles.container} noValidate autoComplete="off">
          <TextField
            id="standard-full-width"
            label="Gym Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            className={styles.textField}
            fullWidth
            margin="normal"
            //variant="outlined"
          />
          <TextField
            id="standard-full-width"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            className={styles.textField}
            fullWidth
            margin="normal"
            //variant="outlined"
          />
            <TextField
              required
              id="standard-full-width"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              label="Phone Number"
              className={styles.textField}
              fullWidth
              //placeholder="Phone Number"
              margin="normal"
              //variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">(+91)</InputAdornment>,
              }}
            />
          </form>
        </Paper>);
      case 1:
        return (<Paper style={{padding: 20,
        margin: "auto"}}>
          <form className={styles.container} noValidate autoComplete="off">
          <TextField
            id="standard-full-width"
            label="City"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
            required
            className={styles.textField}
            fullWidth
            margin="normal"
            //variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Address"
            name="address"
            value={this.state.address}
            onChange={this.handleChange}
            required
            multiline
            fullWidth
            rows="3"
            className={styles.textField}
            margin="normal"
            //variant="outlined"
          />
          <TextField
            id="standard-full-width"
            label="Latitude"
            name="latitude"
            value={lat}
            onChange={this.handleChange}
            required
            className={styles.textField}
            fullWidth
            margin="normal"
            //variant="outlined"
          />
            <TextField
              required
              id="standard-full-width"
              label="Longitude"
              name="longitude"
              value={long}
              onChange={this.handleChange}
              className={styles.textField}
              fullWidth
              margin="normal"
              //variant="outlined"
            />
          </form>
        </Paper>);
      case 2:
        return (<Paper style={{padding: 20,
        margin: "auto"}}>
          <form className={styles.container} noValidate autoComplete="off">
          <TextField
            id="standard-full-width"
            label="Name"
            name="contactPersonName"
            value={this.state.contactPersonName}
            onChange={this.handleChange}
            required
            className={styles.textField}
            fullWidth
            margin="normal"
            //variant="outlined"
          />
          <TextField
            id="standard-full-width"
            label="Email"
            name="contactPersonEmail"
            value={this.state.contactPersonEmail}
            onChange={this.handleChange}
            required
            className={styles.textField}
            fullWidth
            margin="normal"
            //variant="outlined"
          />
            <TextField
              required
              id="standard-full-width"
              label="Phone Number"
              name="contactPersonNumber"
              value={this.state.contactPersonNumber}
              onChange={this.handleChange}
              className={styles.textField}
              fullWidth
              //placeholder="Phone Number"
              margin="normal"
              //variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">(+91)</InputAdornment>,
              }}
            />
            <TextField
              id="standard-full-width"
              label="Designation"
              name="contactPersonDesignation"
              value={this.state.contactPersonDesignation}
              onChange={this.handleChange}
              required
              className={styles.textField}
              fullWidth
              margin="normal"
              //variant="outlined"
            />
          </form>
        </Paper>);
      case 3:
        return (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography>Read Terms & Conditions</Typography>
              <IconButton label="Delete" onClick={this.handleClickOpenTandC}>
              <DescriptionIcon />
              </IconButton></div>
            );
      default:
        return 'Unknown step';
    }
  }

  getSteps() {
    return ['Basic information', 'Location details', 'Contact person', 'Terms and Conditions'];
  }

  initGeoLocation = () =>{
             navigator.geolocation.getCurrentPosition(this.success);
    }

    success = (position) => {
      this.setState({lat: position.coords.latitude});
      this.setState({long: position.coords.longitude});
    }

    componentDidMount=()=> {
      this.initGeoLocation();
    }

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className={classes.joinusmain}>
      <Navbar />
      <div className={classes.root}>
      <Media>
      {({ breakpoints, currentBreakpoint }) =>
          breakpoints[currentBreakpoint] > breakpoints.mobileLandscape ? (
            <Stepper activeStep={activeStep} orientation="horizontal">
              {steps.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel >{label}</StepLabel>
                    <StepContent>
                      <Typography>{this.getStepContent(index,this.state.lat, this.state.long)}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Accept & Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          ) : (
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{this.getStepContent(index,this.state.lat, this.state.long)}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Accept & Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          )
        }

        </Media>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>

            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={loading}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snackOpen}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Details saved!</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />

          </Paper>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
              Statements for Terms and Conditions.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRejectTandC} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAcceptTandC} color="primary">
              Accept and Finish
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
