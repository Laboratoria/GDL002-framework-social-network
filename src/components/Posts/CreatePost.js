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
      images: {},
      isPublic: false,
      error: null,
      text: "",
      username: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }
  getMoment() {
    let moment = { date: null, time: null };
    const date = new Date();
    const today = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    const now = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    moment = { date: today, time: now };
    return moment;
  }
  onChangeText = event => {
    this.setState({
      text: event.target.value,
      username: this.props.firebase.activeUser.username
    });
    console.log(this.state.text);
  };
  onChangeCheckbox = event => {
    this.setState({ isPublic: event.target.checked });
    console.log("Public: " + this.state.isPublic);
  };

  handleImageChange(e) {
    e.preventDefault();
    const fileTypes = ["jpg", "jpeg", "png", "gif"];
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      let extension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      const isImage = fileTypes.indexOf(extension) > -1; //&& file.size < 5000
      if (isImage) {
        reader.onloadend = () => {
          this.setState({
            error: null,
            images: { imgName: file.name, imagePreviewUrl: reader.result }
          });
        };

        reader.readAsDataURL(file);
      } else {
        this.setState({ error: "No es un archivo de imagen" });
      }
    }
  }

  createPost(authorID) {
    console.log(this.state);
    this.props.firebase
      .post(authorID)
      .set(this.state)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  componentDidMount() {
    // console.log(this.props.firebase.activeUser.username);
    // this.setState({ username: this.props.firebase.activeUser.username });
  }
  componentDidUpdate() {
    console.log(this.state.username);
  }
  render() {
    const isInvalid = this.state.error != null || this.state.text == "";

    return (
      <div>
        <h2>
          Hola
          <label> {this.props.firebase.activeUser.username}</label>
        </h2>
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
            this.createPost(this.props.firebase.activeUser.uid);
          }}
        >
          Publicar
        </button>
      </div>
    );
  }
}

const CreatePost = withFirebase(CreatePostBase);

export default CreatePost;
