import React from "react";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";

const AccountPage = () => (
  <div>
    <h1> Account Page </h1>
    <div>
      <label>Olvidé mi contraseña:</label>
      <PasswordForgetForm />
    </div>
    <div>
      <label>Quiero cambiar mi contraseña:</label>
      <PasswordChangeForm />
    </div>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
