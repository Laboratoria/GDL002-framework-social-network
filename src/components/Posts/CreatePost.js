import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import styled from "styled-components";

const ImagePreview = styled.img`
  max-width: 30%;
`;

class CreatePostBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: this.getMoment(),
      images: { file: "", imagePreviewUrl: "" },
      isPublic: false,
      error: null,
      text: "",
      username: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    // this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.createPost = this.createPost.bind(this);
  }
  getMoment() {
    let moment = { date: null, time: null };
    let d = new Date();
    let today = `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
    let now = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    moment = { date: today, time: now };
    return moment;
  }
  onChangeText = event => {
    this.setState({ text: event.target.value });
    console.log(this.state.text);
  };
  onChangeCheckbox = event => {
    this.setState({ isPublic: event.target.checked });
    console.log("Public: " + this.state.isPublic);
  };

  handleImageChange(e) {
    e.preventDefault();
    let fileTypes = ["jpg", "jpeg", "png", "gif"];
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      let extension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let isImage = fileTypes.indexOf(extension) > -1;
      if (isImage) {
        reader.onloadend = () => {
          this.setState({
            error: null,
            images: { file: file, imagePreviewUrl: reader.result }
          });
        };

        reader.readAsDataURL(file);
      } else {
        this.setState({ error: "No es un archivo de imagen" });
      }
    }
  }

  createPost(name) {
    this.setState({ username: name });
    console.log(this.state);
  }

  componentDidMount() {}
  render() {
    const isInvalid = this.state.error != null;
    let author = "";

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {(author = authUser.username)}
            {console.log(authUser.username)}
            <h2>Hola, {authUser.username}</h2>
            <h3>Comparte tu último descubrimiento:</h3>
            <input type="text" onChange={this.onChangeText} />
            <label>
              Post privado (visible sólo en mi club):
              <input
                name="isPublic"
                type="checkbox"
                checked={this.state.isPublic}
                value={false}
                onChange={this.onChangeCheckbox}
              />
            </label>
            <div>
              <form onSubmit={this.handleImageSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.handleImageChange}
                />
              </form>
            </div>
            <ImagePreview src={this.state.images.imagePreviewUrl} />
            <div>{this.state.error}</div>
            <button
              disabled={isInvalid}
              type="submit"
              onClick={() => {
                this.createPost(author);
              }}
            >
              Publicar
            </button>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const CreatePost = withFirebase(CreatePostBase);

export default CreatePost;
