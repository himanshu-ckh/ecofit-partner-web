import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import '../App.css';
import sample from '../staticfiles/partnerloginpage.mp4';
import SignIn from './signin';
import Navbar from './navbar';


class PartnersLoginPage extends Component {
  render() {
    return (
      <div className="partnerlogin">
      <Navbar />
      <div className="videoTag">
        <video className="videoTag"  autoPlay loop muted>
          <source src={sample} type='video/mp4' />
        </video>
        <SignIn />
        </div>
        </div>
    );
  }
}

export default PartnersLoginPage;
