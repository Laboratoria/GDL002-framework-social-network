import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext, withAuthorization } from "../Session";
import { compose } from "recompose";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.users().onSnapshot(querySnapshot => {
      var user = [];

      querySnapshot.docs.map(e => {
        const usersincome = { userID: e.id, userData: e.data() };
        user.push(usersincome);
        return user;
      });
      this.setState({ users: user, loading: false });
    });
  }

  componentWillUnmount() {
    this.unsusbcribe();
  }

  render() {
    return <h1>{console.log(this.state.users)}Admin</h1>;
  }
}

export default withFirebase(Admin);

// class AdminPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       users: []
//     };
//   }
// componentDidMount() {
//   this.setState({ loading: true });

//   this.props.firebase.user().on("value", snapshot => {
//     const usersObject = snapshot.val();

//     const usersList = Object.keys(usersObject).map(key => ({
//       ...usersObject[key],
//       uid: key
//     }));

//     this.setState({
//       users: usersList,
//       loading: false
//     });
//   });
// }

// componentWillUnmount() {
//   this.props.firebase.users().off();
// }

//   render() {
//     return (
//       <AuthUserContext.Consumer>
//         <h1>AdminPage</h1>
//       </AuthUserContext.Consumer>
//     );
//   }
// }

// const condition = authUser => !!authUser;

// const Admin = compose(
//   withFirebase,
//   withAuthorization(condition)
// )(AdminPage);

// export default Admin;
