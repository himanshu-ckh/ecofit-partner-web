import MainProfilePage from './mainprofilepage';
import VisitHistory from './visithistory';
import UpComing from './upcoming';
import ProfileImages from './profileimages';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

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
    backgroundColor: theme.palette.background.paper,
  },
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
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="off">
            <Tab label="Up Coming" />
            <Tab label="History" />
            <Tab label="Profile" />
            <Tab label="Images" />
          </Tabs>
        </AppBar>
                {value === 0 && <TabContainer><UpComing /></TabContainer>}
                {value === 1 && <TabContainer><VisitHistory /></TabContainer>}
                {value === 2 && <TabContainer><MainProfilePage /></TabContainer>}
                {value === 3 && <TabContainer><ProfileImages /></TabContainer>}
      </div>
    );
  }
}

SideTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideTab);
