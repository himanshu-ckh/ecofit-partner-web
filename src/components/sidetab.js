import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MainProfilePage from './mainprofilepage';
import VisitHistory from './visithistory';
import UpComing from './upcoming';
import Card from '@material-ui/core/Card';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxHeight: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

class SideTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card className={classes.root}>

          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="black"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.tabname}
          >
            <Tab label="Up Coming Vists" />
            <Tab label="Vist History" />
            <Tab label= "Update Profile"/>
          </Tabs>

        {value === 0 && <TabContainer><UpComing /></TabContainer>}
        {value === 1 && <TabContainer><VisitHistory /></TabContainer>}
        {value === 2 && <TabContainer><MainProfilePage /></TabContainer>}
      </Card>
    );
  }
}

SideTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideTab);
