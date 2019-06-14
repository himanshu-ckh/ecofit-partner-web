import React, { Component } from "react";
import "../App.css";
import SignIn from "./signin";
import Navbar from "./navbar";

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
