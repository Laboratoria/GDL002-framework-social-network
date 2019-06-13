import React from "react";
import { withFirebase } from "../Firebase";
import Button from "../Button";

const SignOutButton = ({ firebase }) => (
  <Button name="Cerrar Sesión" action={firebase.doSignOut} />
);

export default withFirebase(SignOutButton);
