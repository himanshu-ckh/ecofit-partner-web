import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Data from '../upcomingvisit.js';
import img from '../staticfiles/img3.jpeg';
import { Button } from '@material-ui/core';


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
  state = { expanded: false, data: Data, idval: false, imageUploaded: false};


  // onChange(e) {
  //     let files = e.target.files;
  //     let reader = new FileReader();
  //     reader.readAsDataURL(files[0]);
  //     reader.onload= (e) =>{
  //       console.log(e.target.result);
  //       const url = "aws url";
  //       const formData = {file: e.target.result}; 
  //       return post(url, formData)
  //       .then(response =>{
  //         console.log("result", response);
  //       })
  //     } 
  //   }

    onSubmitChange = (e) => {
      this.setState({imageUploaded: true});
      console.log("hello");
    }

    checkIfImageIsUploaded = (classes) =>{
      if(this.state.imageUploaded == true) {
        return (
          <div className={classes.main}>
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
        else {
          return (
            <div className={classes.main}>
          <Card className={classes.cardmain}>
            <input type="file" name =" file"  />
            <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmitChange}> 
            Upoad 
            </Button>
          </Card>
          </div>
          );
        }
    }

  render() {
    const { classes, theme } = this.props;

    return(
      <div>
      {this.checkIfImageIsUploaded(classes)}
      </div>
    )

    
  }
}

ProfileImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileImages);
