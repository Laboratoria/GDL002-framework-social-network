import React from "react";
import { compose } from "recompose";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1> Mi Cuenta </h1>
        <h2>Hola: {authUser.username}!</h2>
        <p>
          <strong>ID USUARIO:</strong> {authUser.uid}
        </p>
        <div>
          <h3>Olvidé mi contraseña:</h3>
          <PasswordForgetForm />
        </div>
        <div>
          <h3>Quiero cambiar mi contraseña:</h3>
          <PasswordChangeForm />
        </div>
        {/* {console.log(authUser)} */}
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => authUser && !!authUser;
// const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
