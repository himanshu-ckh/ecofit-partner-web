import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
class ProtectedRoute extends Component {
    
    getCurrentAuthUser = async () => {
    let isLoggedIn = false;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        isLoggedIn = true;
      })
      .catch(err => {
        isLoggedIn = false;
      });
      return isLoggedIn;
  };

  render() {

    let isLoggedIn = false;
    isLoggedIn = this.getCurrentAuthUser();
    return (
      <Route
        render={rProps => {
          console.log(isLoggedIn);
          return (isLoggedIn ? (
            <this.props.render /> 
          ) : (
            <Redirect
              to={`/partnersignin?redirect=${rProps.location.pathname}${
                rProps.location.search
              }`}
            />
          ));
        }}
      />
    );
  }
}

export default ProtectedRoute;
