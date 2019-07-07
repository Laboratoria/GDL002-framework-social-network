import React, { Component } from "react";
import UploadImage from "./UploadImage";
import { withFirebase } from "../Firebase";
import PostsList from "./PostsList";
// import { getMoment } from "../Utils";
// import { AuthUserContext } from "../Session";
// import styled from "styled-components";
//

class PostsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorID: "",
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
      username: this.props.firebase.activeUser.username,
      authorID: this.props.firebase.activeUser.uid
    });
    // console.log(this.state.text);
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

      const size = file.size < 1048487;
      if (!isImage) {
        this.setState({
          error: "No es un archivo de imagen",
          images: { imageUrl: "" }
        });
      } else if (!size) {
        this.setState({
          error: "Archivo demasiado grande",
          images: { imageUrl: "" }
        });
      } else {
        this.setState({ error: null });
        // console.log(file);
        reader.onloadend = () => {
          this.setState({
            error: null,
            images: { imageName: file.name, imageUrl: reader.result }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  createPost() {
    this.props.firebase
      .posts()
      .add({
        createdAt: this.props.firebase.fieldValue.serverTimestamp(),
        ...this.state
      })
      .then(() => {
        console.log(this.state);
        this.setState({
          authorID: "",
          images: {},
          isPublic: false,
          error: null,
          text: "",
          username: ""
        });
        console.log("Document successfully written!");
        console.log(this.state);
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
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
          imageUrl={this.state.images.imageUrl}
          error={this.state.error}
        />

        <button
          disabled={isInvalid}
          type="submit"
          onClick={() => {
            this.createPost();
          }}
        >
          Publicar
        </button>
        <PostsList />
      </div>
    );
  }
}

const Posts = withFirebase(PostsBase);

export default Posts;
