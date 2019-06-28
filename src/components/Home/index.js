import React from "react";
import MessageList from "./Try";
import CreatePost from "../Posts";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";

const HomePage = () => (
  <div>
    <h1> Home </h1>
    <p>La página Home está visible para todos los usuarios logueados</p>
    <p>Currently using React {React.version}</p>
    <CreatePost />
    <MessageList />
  </div>
);

const condition = authUser => !!authUser;

// const TryBase = () => (
//   <div>
//     <p>Hello there</p>
//   </div>
// );

// const Try = withEmailVerification(TryBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
