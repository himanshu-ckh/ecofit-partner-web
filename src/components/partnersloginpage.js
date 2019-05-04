import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import sample from '../staticfiles/partnerloginpage.mp4';
import SignIn from './signin';
import Navbar from './navbar';


class PartnersLoginPage extends Component {
  render() {
    return (
      <div className="partnerlogin">
      <Navbar />
        <SignIn />
        </div>
    );
  }
}

export default PartnersLoginPage;
