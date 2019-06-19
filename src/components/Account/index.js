import React from "react";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";
// import * as ROLES from "../../constants/roles";
// import { auth } from "firebase";

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

export default withAuthorization(condition)(AccountPage);
