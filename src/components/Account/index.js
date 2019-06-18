import React from "react";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";
// import { auth } from "firebase";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1> Mi Cuenta </h1>
        <h2>Hola: {authUser.email}!</h2>
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
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => authUser && !!authUser;
// const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AccountPage);
