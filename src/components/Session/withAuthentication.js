// LOGIC FOR SESSION HANDLING
import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authUser: null };
    }
    // Listens for authenticated user with onAuthStateChanged from Firebase
    // onAuthStateChanged receives a function as parameter that has access to the authenticated user
    // & the passed function is called every time something changes for the authenticated user
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
          // If a user signs out, the authUser object becomes null
          // so the authUser property in the local state is set to null
        },
      );
    }
    // Removes listener if the component unmounts
    componentWillUnmount() {
      this.listener();
    }

    // componentDidMount() {
    //   this.listener = this.props.firebase.auth.onAuthStateChanged(
    //     authUser => {
    //       authUser
    //         ? this.setState({ authUser })
    //         : this.setState({ authUser: null });
    //     },
    //   );
    // }
    // componentWillUnmount() {
    //   this.listener();
    // }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;
