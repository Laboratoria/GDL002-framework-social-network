import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

// const CreatePostBase = () => (
//   <div>
//     <p>Hello there</p>
//   </div>
// );

class CreatePostBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      text: "",
      images: [],
      isPublic: false,
      error: null
    };
  }
  onChangeText = event => {
    this.setState({ text: event.target.value });
    console.log(this.state.text);
  };
  onChangeCheckbox = event => {
    this.setState({ isPublic: event.target.checked });
    console.log("Public: " + this.state.isPublic);
  };
  createPost(event, authUser) {}
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h2>Comparte tu último descubrimiento:</h2>
            <form onSubmit={event => this.createPost(event, authUser)}>
              <input type="text" onChange={this.onChangeText} />
              <label>
                Post privado (sólo amigos):
                <input
                  name="isPublic"
                  type="checkbox"
                  checked={this.state.isPublic}
                  value={false}
                  onChange={this.onChangeCheckbox}
                />
              </label>
              <button type="submit">Publicar</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const CreatePost = withFirebase(CreatePostBase);

export default CreatePost;
