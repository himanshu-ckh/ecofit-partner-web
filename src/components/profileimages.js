import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Data from '../upcomingvisit.js';
import img from '../staticfiles/img3.jpeg';


const styles = theme => ({
  cardmain: {
    display: 'flex',
    marginTop: 10,
    width: '95%',
    height: '40%',
    maxHeight: '100%',
    marginBottom: 20,
    marginLeft: '4%',
    marginRight: '4%',
    display: 'inlineBlock'
  },
  main: {
    display: 'inlineBlock',
    margin: 0,
  },
  media: {
    height: '100%',
    width: '100%',
    paddingTop: '56.25%',

  },
});


class ProfileImages extends React.Component {
  state = { expanded: false, data: Data, idval: false};

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.main}>
      <Card className={classes.cardmain}>
        <CardMedia
          className={classes.media}
          image={img}
          title="Gym Image"
        />
      </Card>
      <Card className={classes.cardmain}>
        <CardMedia
          className={classes.media}
          image={img}
          title="Gym Image"
        />
      </Card>
      <Card className={classes.cardmain}>
        <CardMedia
          className={classes.media}
          image={img}
          title="Gym Image"
        />
      </Card>
      <Card className={classes.cardmain}>
        <CardMedia
          className={classes.media}
          image={img}
          title="Gym Image"
        />
      </Card>
      </div>
    );
  }
}

ProfileImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileImages);
