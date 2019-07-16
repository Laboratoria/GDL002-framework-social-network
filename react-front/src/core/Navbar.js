/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};


const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" 
              style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" 
              style={isActive(history, "/users")} to="/users">
          Users
        </Link>
      </li> 
      
      <li className="nav-item">
          <Link 
             to={`/post/create`} 
             style={isActive(history, `/post/create`)} 
             className="nav-link">
              Create Post
          </Link>
        </li>

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign up
            </Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <>
        <li className="nav-item">
          <Link to={`/findpeople`} 
             style={isActive(history, `/findpeople`)} 
             className="nav-link">
              Find people
          </Link>
        </li>

        <li className="nav-item">
          <Link to={`/user/${isAuthenticated().user._id}`} 
             style={isActive(history, `/user/${isAuthenticated().user._id}`)} 
             className="nav-link">
              {`${isAuthenticated().user.name}'s profile`}
          </Link>
        </li>

        <li className="nav-item">
            <span
                className="nav-link"
                style={
                        (isActive(history, "/signup"),
                        { cursor: "pointer", color: "#fff" })
                      }
                onClick={() => signout(() => history.push("/"))}>
                  Sign Out
            </span>
        </li>

        </>
      )}

    </ul>
  </div>
);

export default withRouter(Navbar);
