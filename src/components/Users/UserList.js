import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";

class UserList extends Component {
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
                {/* <Link
                  to={{
                    pathname: `${ROUTES.ADMIN_DETAILS}/${user.userID}`,
                    state: { user }
                  }}
                >
                  Details
                </Link> */}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(UserList);
