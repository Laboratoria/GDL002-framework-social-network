import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    {/* <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch> */}

    <Switch>
      {" "}
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />{" "}
      <Route exact path={ROUTES.ADMIN} component={UserList} />{" "}
    </Switch>
  </div>
);

class UserListBase extends Component {
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
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
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
              <span>
                <Link
                  to={{
                    // pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    pathname: `${ROUTES.ADMIN}/${user.userID}`,
                    state: { user }
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state
    };
  }

  //   componentDidMount() {
  //     if (this.state.user) {
  //       return;
  //     }

  //     this.setState({ loading: true });

  //     this.props.firebase
  //       .user(this.props.match.params.id)
  //       .on("value", snapshot => {
  //         this.setState({
  //           user: snapshot.val(),
  //           loading: false
  //         });
  //       });
  //   }

  //   componentWillUnmount() {
  //     this.props.firebase.user(this.props.match.params.id).off();
  //   }

  componentDidMount() {
    if (this.state.user) {
      console.log(this.state.user);
      return;
    }

    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .user(this.props.match.params.id)
      .onSnapshot(snapshot => {
        this.setState({
          user: snapshot.data(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.userID}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.userData.email}
            </span>
            <span>
              <strong>Username:</strong> {user.userData.username}
            </span>

            <span>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default withAuthorization(condition)(AdminPage);
