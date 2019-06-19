import React from "react";
import { Switch, Route } from "react-router-dom";

import { withAuthorization } from "../Session";
import { UserList, UserItem } from "../Users";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>
      Esta página es visible a todos los usuarios logueados como
      administradores.
    </p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);

// import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
// import { compose } from "recompose";

// import { withFirebase } from "../Firebase";
// import { withAuthorization } from "../Session";
// import * as ROLES from "../../constants/roles";
// import * as ROUTES from "../../constants/routes";

// // const NewAdminPage = () => (
// //   <div>
// //     <h1>Admin</h1>
// //     <p>The Admin Page is accessible by every signed in admin user.</p>
// //     <Switch>
// //       <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
// //       <Route exact path={ROUTES.ADMIN} component={UserList} />
// //     </Switch>
// //   </div>
// // );

// class Admin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       users: []
//     };
//   }

//   componentDidMount() {
//     this.setState({ loading: true });

//     this.unsubscribe = this.props.firebase.users().onSnapshot(querySnapshot => {
//       var user = [];

//       querySnapshot.docs.map(e => {
//         const usersincome = { userID: e.id, userData: e.data() };
//         user.push(usersincome);
//         return user;
//       });
//       this.setState({ users: user, loading: false });
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   render() {
//     console.log(this.state.users);
//     const { users, loading } = this.state;

//     return (
//       <div>
//         <h1>Admin</h1>

//         {loading && <div>Loading ...</div>}

//         <UserList users={users} />
//       </div>
//     );
//   }
// }

// const UserList = ({ users }) => (
//   <ul>
//     {users.map(user => (
//       <li key={user.userID}>
//         <span>
//           <strong>ID:</strong> {user.userID}
//         </span>
//         <span>
//           <strong>E-Mail:</strong> {user.userData.email}
//         </span>
//         <span>
//           <strong>Nombre de Usuario:</strong> {user.userData.username}
//         </span>
//         <span>
//           {/* <strong>Rol:</strong> {user.userData.roles.map(rol => rol.ADMIN)} */}
//         </span>
//       </li>
//     ))}
//   </ul>
// );

// const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

// export default compose(
//   withFirebase,
//   withAuthorization(condition)
// )(Admin);

// // const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
// // return compose(
// //   withFirebase,
// //   withAuthorization(condition)
// // )(Admin); //como higher order function en vanilla JS

// // class AdminPage extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       loading: false,
// //       users: []
// //     };
// //   }
// // componentDidMount() {
// //   this.setState({ loading: true });

// //   this.props.firebase.user().on("value", snapshot => {
// //     const usersObject = snapshot.val();

// //     const usersList = Object.keys(usersObject).map(key => ({
// //       ...usersObject[key],
// //       uid: key
// //     }));

// //     this.setState({
// //       users: usersList,
// //       loading: false
// //     });
// //   });
// // }

// // componentWillUnmount() {
// //   this.props.firebase.users().off();
// // }

// //   render() {
// //     return (
// //       <AuthUserContext.Consumer>
// //         <h1>AdminPage</h1>
// //       </AuthUserContext.Consumer>
// //     );
// //   }
// // }

// // const condition = authUser => !!authUser;

// // const Admin = compose(
// //   withFirebase,
// //   withAuthorization(condition)
// // )(AdminPage);

// // export default Admin;
