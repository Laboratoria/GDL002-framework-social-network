import React from "react";
import { FirebaseContext } from "../Firebase";
import Button from "../Button";
import { SignUpLink } from "../SignUp";
import { SignInLink } from "../SignIn";
// const SomeComponent = () => (

// );
const Landing = () => (
  <div>
    <h1> Landing </h1>
    <h2>
      Bienvenido a Socialbook, ¿por qué no <SignUpLink />?
    </h2>
    <h2>
      O puedes <SignInLink />
    </h2>

    <Button
      name="A Button"
      action={() => {
        console.log("a button");
        window.location.href = "https://google.com";
      }}
    />
    <Button
      name="Another Button"
      action={() => {
        console.log("another button");
      }}
      extraClassName="other-btn"
    />

    <FirebaseContext.Consumer>
      {firebase => {
        return <div>I ' ve access to Firebase and render something .</div>;
      }}
    </FirebaseContext.Consumer>
  </div>
);

export default Landing;
