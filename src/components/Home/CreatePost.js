import React from "react";
import { withFirebase } from "../Firebase";

const CreatePostBase = () => (
  <div>
    <p>Hello there</p>
  </div>
);

const CreatePost = withFirebase(CreatePostBase);

export default CreatePost;
