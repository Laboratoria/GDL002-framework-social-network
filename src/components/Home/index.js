import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";

const HomePage = () => (
  <div>
    <h1> Home </h1>
    <p>La página Home está visible para todos los usuarios logueados</p>
    <p>Currently using React {React.version}</p>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
