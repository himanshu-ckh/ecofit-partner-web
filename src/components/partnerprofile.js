import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavbarPartnerProfile from './navbarpartnerprofile';
import SideTab from './sidetab';
import img from '../staticfiles/golds.png';
import '../App.css';


const styles = theme => ({
  main:{
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: '100%',
    width: 350,
    maxHeight: '100%',
    marginLeft: '7%',
    marginTop: '1%',
  },
  cardmain: {
    height: 450,
  },
  cardcontent:{
    float:'left',
  },
  sidetab:{
    width: 740,
    maxWidth: '80%',
    marginRight: '4%',
    marginTop: '1%',
    marginLeft: '4%'
  },
  media: {
    height: 300,
    width: 300,
    paddingTop: '56.25%',
    borderRadius: '50%',
    marginTop: 10,
    marginLeft: '7%',
    marginRight: '5%',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class PartnerProfile extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      <NavbarPartnerProfile />
      <div className={classes.main}>
      <div className={classes.card}>
      <Card className={classes.cardmain}>
        <CardMedia
          className={classes.media}
          image={img}
          title="Gym Image"
        />
        <CardContent>
        <Typography className={classes.cardcontent} component="p">
          Golds Gym EC
        </Typography>
      </CardContent>
        <CardContent>
          <Typography className={classes.cardcontent} component="p">
            Electonic cityPhase 1
          </Typography>
          </CardContent>
          <CardContent>
          <Typography className={classes.cardcontent} component="p">
            9943639427
          </Typography>
        </CardContent>
        <CardContent>
        <Typography className={classes.cardcontent} component="p">
          Bangalore
        </Typography>
      </CardContent>
      </Card>
      </div>
      <div className={classes.sidetab}>
      <SideTab />
      </div>
      </div>
      </div>
    );
  }
}

PartnerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerProfile);
