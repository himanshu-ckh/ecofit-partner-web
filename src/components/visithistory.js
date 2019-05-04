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
import img1 from '../staticfiles/img3.jpeg';


const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: 10,
    width: '85%',
    marginLeft: 10,
    height: '40%',
    maxHeight: '100%',
    marginBottom: 20,
    marginLeft: '7%'
  },
  main: {
    display: 'inlineBlock',
    margin: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '48%',
  },
  content: {
    flex: '1 0 auto',

  },
  cover: {
    marginTop: 5,
    marginRight: '5%',
    marginBottom: 5,
    marginLeft:'17%',
    width: 150,
    height: 150,
    borderRadius: '50%',
    justifyContent:'right',
  },
});


class VisitHistory extends React.Component {
  state = { expanded: false, data: Data, idval: false};

  renderUpcomingVisitCard = (classes, theme) => {
    return (
      <div className={classes.main}>
      {this.state.data.map(p =>
        <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="black">
              Name: {p.name}
            </Typography>
            <Typography variant="subtitle1" color="black">
              Visit Date: 8th April 2019
            </Typography>
            <Typography variant="subtitle1" color="black">
              Age: 22
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={img1}
          title="User Image"
        />
      </Card>
    )}
    </div>
    )
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.main}>
      {this.renderUpcomingVisitCard(classes, theme)}
      </div>
    );
  }
}

VisitHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VisitHistory);
