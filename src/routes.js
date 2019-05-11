import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./protectedroute";
import ProppedRoute from "./proppedroute";
import PartnersLoginPage from "./components/partnersloginpage";
import JoinUsPage from "./components/joinuspage";
import PartnerProfile from "./components/partnerprofile";
import FirstTimeNewPassword from "./components/newpassword";
import ForgotPassword from "./components/forgotpassword";
class Routes extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          render={PartnerProfile}
        />
        <ProppedRoute
          exact
          path="/partnersignin"
          render={PartnersLoginPage}
        />

        <Route exact path="/joinus" render={() => <JoinUsPage />} />

        <Route
          exact
          path="/firsttimenewpassword"
          render={() => <FirstTimeNewPassword />}
        />

        <Route exact path="/forgotpassword" render={() => <ForgotPassword />} />
      </Switch>
    );
  }
}

export default Routes;
