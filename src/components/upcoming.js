import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Data from '../upcomingvisit.js';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: 10,
    width: '85%',
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
    marginLeft: '17%',
    width: 150,
    height: 150,
    borderRadius: '50%',
    justifyContent: 'right',
  },
  search: {
    width: '80%',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  }
});


class UpComing extends React.Component {
  state = { expanded: false, data: Data, idval: false, search: '', filteredResult: Data };

  renderUpcomingVisitCard = (classes, theme) => {
    return (
      <div className={classes.main}>
        {this.state.filteredResult.map(p =>
          <Card key={p.id} className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="subtitle1" color="default">
                  Name: {p.name}
                </Typography>
                <Typography variant="subtitle1" color="default">
                  Visit Date: 8th April 2019
            </Typography>
                <Typography variant="subtitle1" color="default">
                  Age: 22
            </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              image={p.image}
              title="User Image"
            />
          </Card>
        )}
      </div>
    )
  }
  showSearchedResult = (value) => {
    console.log(value);

      var obj = this.state.data.filter( filt => {
        console.log(filt.name.toLowerCase());
        return (filt.name.toLowerCase().includes(value));
      });
      this.setState({filteredResult: obj});
    }
    

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.showSearchedResult(this.state.search);
    
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
            name="search"
            onChange={this.handleChange('search')}
            margin="normal"
            variant="outlined"
          />
        </form>
        {this.renderUpcomingVisitCard(classes, theme)}
      </div>
    );
  }
}

UpComing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpComing);
