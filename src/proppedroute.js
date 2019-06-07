import React, { Component } from 'react';
import {  Route } from 'react-router-dom';

class ProppedRoute extends Component {
  
    render() {
      return(
          <Route render={rProps => <this.props.render />} />
      )
    }
  }

  export default ProppedRoute;