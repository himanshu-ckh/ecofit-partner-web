import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  textField: {
    width: '90%',

    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class OutlinedTextFields extends React.Component {
  state = {
    name: ' ',
    phoneNumber: ' ',
    address:' ',
    openingHours: ' ',
    closingHours: ' ',
    contactPersonName: ' ',
    contactPersonEmail:' ',
    contactPersonNumber: ' ',
    contactPersonDesignation: ' ',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Gym-Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-phoneNumber"
          label="Phone Number"
          className={classes.textField}
          value={this.state.phoneNumber}
          onChange={this.handleChange('phoneNumber')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-address"
          label="Address"
          multiline
          className={classes.textField}
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-openingHours"
          label="Opening Hours"
          className={classes.textField}
          value={this.state.openingHours}
          onChange={this.handleChange('openingHours')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-closingHours"
          label="Closing Hours"
          className={classes.textField}
          value={this.state.closingHours}
          onChange={this.handleChange('closingHours')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-contactPersonName"
          label="Contact Person Name"
          className={classes.textField}
          value={this.state.contactPersonName}
          onChange={this.handleChange('contactPersonName')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-contactPersonEmail"
          label="Contact Person Email"
          className={classes.textField}
          value={this.state.contactPersonEmail}
          onChange={this.handleChange('contactPersonEmail')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-contactPersonNumber"
          label="Contact Person Phone Number"
          className={classes.textField}
          value={this.state.contactPersonNumber}
          onChange={this.handleChange('contactPersonNumber')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-contactPersonDesignation"
          label="Contact Person Designation"
          className={classes.textField}
          value={this.state.contactPersonDesignation}
          onChange={this.handleChange('contactPersonDesignation')}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
