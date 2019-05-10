import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
class ProtectedRoute extends Component {
    constructor(props){
      super(props)
    }
    render() {
      return(
        
          <Route
    render={rProps => {
      console.log(this.props.pro.isLoggedIn);
      console.log(this.props.pro.user);
      return (this.props.pro.isLoggedIn ? (
        < this.props.render />
      ) : (
        <Redirect
          to={`/partnersignin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
      );
    }
  }
  />
      )
    }
  }

  export default ProtectedRoute;