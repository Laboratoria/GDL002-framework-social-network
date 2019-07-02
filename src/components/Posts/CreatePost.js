import React, { Component } from "react";
import UploadImage from "./UploadImage";
import { withFirebase } from "../Firebase";
import { getMoment } from "../Utils";
// import { AuthUserContext } from "../Session";
// import styled from "styled-components";

class CreatePostBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: getMoment(),
      images: {},
      isPublic: false,
      error: null,
      text: "",
      username: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.createPost = this.createPost.bind(this);
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

      const size = file.size < 5000000;
      if (!isImage) {
        this.setState({ error: "No es un archivo de imagen" });
      } else if (!size) {
        this.setState({ error: "Archivo demasiado grande" });
      } else {
        this.setState({ error: null });
        console.log(file);
        reader.onloadend = () => {
          this.setState({
            error: null,
            images: { imageName: file.name, imagePreviewUrl: reader.result }
          });
        };
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
    const isInvalid = this.state.error != null || this.state.text === "";

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
        <UploadImage
          handleImageChange={this.handleImageChange}
          imagePreviewUrl={this.state.images.imagePreviewUrl}
          error={this.state.error}
        />

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
