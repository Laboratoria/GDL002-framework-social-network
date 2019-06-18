import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAutohorization = condition => Component => {
  class withAuthorization extends React.Component {
    //AUTHORIZATION LOGIC WITH FIREBASE LISTENER,
    //TRIGGERS A CALLBACK FUNCTION ("condition()") EVERY TIME THE AUTHENTICATED USER CHANGES
    // condition() is executed with the authUser
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          // condition() is executed with the authUser
          this.props.history.push(ROUTES.SIGN_IN);
          // If authorization fails,
          //for instance because the authenticated user is null ,
          //the component redirects to the sign in page.
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        // AuthUserContext shows the Passed Component (page) after the redirection happens
        <AuthUserContext.Consumer>
          {authUser =>
            // ----> Passed Component (page) that should be protected
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(
    withRouter,
    withFirebase
  )(withAuthorization); //como higher order function en vanilla JS
};

export default withAutohorization;
