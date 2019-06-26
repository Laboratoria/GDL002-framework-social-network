import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
// import { FirebaseContext } from '../Firebase';
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import styled from "styled-components";

const FormSignUp = styled.form`
  display: flex;
  max-width: 20rem;
  padding: 0.5rem;
  ${props => props.vertical && "flex-direction: column;"} > * {
    flex: 1;

    &:not(:first-child) {
      ${props => (props.vertical ? "margin-top" : "margin-left")}: 0.5rem;
    }
  }

  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #b6b6b6;
  }

  input::placeholder {
    color: #ff00cb;
  }

  button {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
  }
`;
const SignUpPage = () => (
  <div>
    <h1> Registrar Nuevo Usuario </h1>
    <SignUpForm />
  </div>
);

// INITIAL_STATE Captures User Information
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
};

// SignUpForm Manages the FORM STATE in React's local state
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }; // ... is SPREAD OPERATOR, here is like a PUSH METHOD
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in Firestore
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            roles
          },
          { merge: true }
        );
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME); // Pushes the route to the history object
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <FormSignUp vertical onSubmit={this.onSubmit} className="sign-up-form">
        {/* INPUTS get value from local state & updates it with a onChange handler */}
        <label>Nombre Completo</label>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Nombre Completo"
        />
        <label>Email</label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <label>Contraseña</label>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Contraseña"
        />
        <label>Confirmar Contraseña</label>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirmar Contraseña"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </FormSignUp>
    );
  }
}

const SignUpLink = () => (
  <React.Fragment>
    <Link to={ROUTES.SIGN_UP}> Crear una Cuenta </Link>
  </React.Fragment>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
