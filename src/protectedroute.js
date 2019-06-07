import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
class ProtectedRoute extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: 0,
      user:{
        attributes:{},
        signInUserSession:{
          accessToken:{},
        }
      },
      isLoggedIn: {},
      userData: {
        images: {
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          profile: {},
        }
      },
    };
    }

    componentDidMount () {
      Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          user:user,
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({isLoggedIn: false});
        console.log(err)
      });

    
    }

  render() {
    return (
      <Route
        render={rProps => {
          return (this.state.isLoggedIn ? (
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
