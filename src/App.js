import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PartnersLoginPage from './components/partnersloginpage';
import JoinUsPage from './components/joinuspage';
import PartnerProfile from './components/partnerprofile';
import FirstTimeNewPassword from './components/newpassword';
import VisitHistory from './components/visithistory';
import MainProfilePage from './components/mainprofilepage';
import UpComing from './components/upcoming';
import './App.css';

import Amplify, { Auth, API } from 'aws-amplify'
import AWSConfig from './aws-exports'
Amplify.configure(AWSConfig)

const Routes = ({childProps}) => (
  <Switch>
    <Route exact path='/partnersignin' render={() => (<PartnersLoginPage/>)}/>
    <Route exact path='/joinus' render={() => (<JoinUsPage/>)}/>
    <ProtectedRoute exact
    path='/'
    render={() => (<PartnerProfile/>)}
    props={childProps}/>
    <Route exact path='/firsttimenewpassword' render={() => (<FirstTimeNewPassword/>)}/>
  </Switch>
);

const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      childProps.isLoggedIn ? (
        <C {...rProps} {...childProps} />
      ) : (
        <Redirect
          to={`/partnersignin?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);


class App extends Component {
  constructor(props){
  super(props)
  this.state ={
    authState: {
      isLoggedIn: false,
    }
  };
  this.checkCurrentAuthenticatedUser();

}

checkCurrentAuthenticatedUser = () =>{
  Auth.currentAuthenticatedUser()
  .then(user => {
    console.log(user);
    this.setState({authState: {isLoggedIn: true}})
  })
  .catch(err => console.log(err));
}

  render() {
    const childProps = {
      isLoggedIn: this.state.authState.isLoggedIn,
      onUSerSignIn: this.handleUserSignIn
    }
    return (
      <div className="App">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
