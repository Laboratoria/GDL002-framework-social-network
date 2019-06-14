import React from "react";
import { withAuthorization } from "../Session";

const HomePage = () => (
  <div>
    <h1> Home </h1>
    <p>La página Home está visible para todos los usuarios logueados</p>
    <p>Currently using React {React.version}</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
