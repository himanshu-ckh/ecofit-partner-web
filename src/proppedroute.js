import React, { Component } from 'react';
import {  Route } from 'react-router-dom';

class ProppedRoute extends Component {
    constructor(props){
      super(props)
    }
  
    render() {
      return(
          <Route render={rProps => <this.props.render />} />
      )
    }
  }

  export default ProppedRoute;