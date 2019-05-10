import React, { Component } from 'react';
import Routes from './routes';
import './App.css';

import Amplify, { Auth } from 'aws-amplify'
import AWSConfig from './aws-exports'
Amplify.configure(AWSConfig)

class App extends Component {
  constructor(props){
  super(props)
  this.state ={
      isLoggedIn: false,
      user: {},
    };
  
}

async componentDidMount () {
  
    Auth.currentAuthenticatedUser()
    .then(user => {
      this.setState({user: user});
      this.setState({isLoggedIn: true});
      console.log(this.state.isLoggedIn)
    })
    .catch(err => {
      this.setState({isLoggedIn: false});
      console.log(err)
    })
    }

  render() {
    const childProps = {
      isLoggedIn: this.state.isLoggedIn,
      onUserSignIn: this.handleUserSignIn,
      user: this.state.user,
    }
    return (
      <div className="App">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
