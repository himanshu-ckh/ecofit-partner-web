import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
class ProtectedRoute extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: 0,
      user:{},
    };
    this.isLoggedIn = this.getCurrentAuthUser();
    }


  getCurrentAuthUser = async () => {
    let isLoggedIn = false;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        isLoggedIn = true;
        this.setState({user:user});
      })
      .catch(err => {
        isLoggedIn = false;
        console.log(err)
      });
      return isLoggedIn;
  };

  render() {

    
    console.log(this.state.user)
    return (
      <Route
        render={rProps => {
          console.log(this.isLoggedIn);
          return (this.isLoggedIn ? (
            <this.props.render user={this.state.user}/> 
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
