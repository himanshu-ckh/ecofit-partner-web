import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PartnersLoginPage from './components/partnersloginpage';
import JoinUsPage from './components/joinuspage';
import ForgotPassword from './components/forgotpassword';
import PartnerProfile from './components/partnerprofile';
import FirstTimeNewPassword from './components/newpassword';
import VisitHistory from './components/visithistory';
import MainProfilePage from './components/mainprofilepage';
import UpComing from './components/upcoming';
import './App.css';

import Amplify, { Auth, API } from 'aws-amplify'
import AWSConfig from './aws-exports'
Amplify.configure(AWSConfig)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (<PartnersLoginPage/>)}/>
        </Switch>
        <Switch>
          <Route exact path='/joinus' render={() => (<JoinUsPage/>)}/>
        </Switch><Switch>
          <Route exact path='/forgotpassword' render={() => (<ForgotPassword/>)}/>
        </Switch>
        <Switch>
          <Route exact path='/partnerprofile' render={() => (<PartnerProfile/>)}/>
        </Switch>
        <Switch>
          <Route exact path='/firsttimenewpassword' render={() => (<FirstTimeNewPassword/>)}/>
        </Switch>
      </div>
    );
  }
}

export default App;
