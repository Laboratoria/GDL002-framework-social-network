import React, { Component } from "react";
import { withFirebase } from "../Firebase";
// eslint-disable-next-line
import { AuthUserContext, withAuthorization } from "../Session";
// eslint-disable-next-line
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
    this.unsubscribe();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.userID}>
        <span>
          <strong>ID:</strong> {user.userID}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.userData.email}
        </span>
        <span>
          <strong>Username:</strong> {user.userData.username}
        </span>
      </li>
    ))}
  </ul>
);

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
