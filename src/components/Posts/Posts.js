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
      loading: false,
      incomingPosts: [],
      limit: 5
      // username: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  onChangeText = event => {
    this.setState({
      text: event.target.value,
      // username: this.props.firebase.activeUser.username,
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
    this.setState({ loading: true });
    this.props.firebase
      .posts()
      .add({
        username: this.props.firebase.activeUser.username,
        // createdAt: this.props.firebase.fieldValue.serverTimestamp(),
        createdAt: new Date(),
        authorID: this.state.authorID,
        images: this.state.images,
        isPublic: this.state.isPublic,
        text: this.state.text
      })
      .then(() => {
        console.log(this.state);
        this.setState({
          authorID: "",
          images: {},
          isPublic: false,
          error: null,
          text: "",
          loading: false
          // username: ""
        });

        console.log("Document successfully written!");
        console.log(this.state);
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  onListenForPosts = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .posts()
      .orderBy("createdAt", "desc")
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let incomingPosts = [];
          snapshot.forEach(doc =>
            incomingPosts.push({ ...doc.data(), uid: doc.id })
          );
          this.setState({
            incomingPosts: incomingPosts,
            loading: false
          });
        } else {
          this.setState({ incomingPosts: null, loading: false });
        }
      });
  };

  /// CON MAP EN LUGAR DE FOREACH
  // onListenForPosts = () => {
  //   this.setState({ loading: true });

  //   this.unsubscribe = this.props.firebase
  //     .posts()
  //     .orderBy("createdAt", "desc")
  //     .limit(this.state.limit)
  //     .onSnapshot(querySnapshot => {
  //       if (querySnapshot.size) {
  //         var post = [];
  //         querySnapshot.docs.map(e => {
  //           const postsincome = { postID: e.id, postData: e.data() };
  //           post.push(postsincome);
  //           return post;
  //         });
  //         this.setState({ posts: post, loading: false });
  //       } else {
  //         this.setState({ posts: null, loading: false });
  //       }
  //     });
  // };

  componentDidMount() {
    this.onListenForPosts();
    console.log(this.props.firebase.activeUser.uid);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onNextPage = () => {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForPosts);
  };

  render() {
    const isInvalid = this.state.error != null || this.state.text === "";

    return (
      <div>
        <h2>
          Hola
          <label> {this.props.firebase.activeUser.username}</label>
        </h2>
        <h3>Comparte tu último descubrimiento:</h3>
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChangeText}
        />
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
        <PostsList
          limit={this.state.limit}
          loading={this.state.loading}
          incomingPosts={this.state.incomingPosts}
          onNextPage={this.state.onNextPage}
        />
      </div>
    );
  }
}

const Posts = withFirebase(PostsBase);

export default Posts;
