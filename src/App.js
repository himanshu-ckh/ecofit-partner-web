import React, { Component } from "react";
import Routes from "./routes";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import AWSConfig from "./aws-exports";
Amplify.configure(AWSConfig);

class App extends Component {

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
