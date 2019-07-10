import React, { Component } from "react";
import { UploadImageEdited } from "./UploadImage";
import styled from "styled-components";

const ImageFromPost = styled.img`
  max-width: 15rem;
`;

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.post.text,
      error: null,
      images: this.props.post.images
    };
    this.handleImageEdit = this.handleImageEdit.bind(this);
    this.editPost = this.editPost.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  editPost() {
    this.setState({ editMode: true });
  }
  cancelEdit() {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.post.text
    }));
  }
  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  handleImageEdit(e) {
    e.preventDefault();
    const fileTypes = ["jpg", "jpeg", "png", "gif"];
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      let extension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      const isImage = fileTypes.indexOf(extension) > -1;

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

  saveEdit = () => {
    this.props.editPost(
      this.props.post,
      this.state.images,
      this.state.editText
    );

    this.setState({ editMode: false });
  };

  // componentDidUpdate() {
  // }

  render() {
    const { authUser, bookIt, deletePost, incomingPosts, post } = this.props;
    const { editMode, editText, images } = this.state;
    return (
      <React.Fragment>
        {editMode ? (
          <div>
            <textarea
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
            {post.images.imageUrl && (
              <div>
                <UploadImageEdited
                  handleImageEdit={this.handleImageEdit}
                  buttonLabel={"Actualizar Imagen"}
                  error={this.state.error}
                  // imageUrl={images.imageUrl}
                />
                <ImageFromPost src={images.imageUrl} />

                <button>Eliminar Imagen</button>
              </div>
            )}

            <button
              onClick={() => {
                console.log(this.state);
                this.saveEdit();
              }}
            >
              Actualizar Post
            </button>
            <button onClick={this.cancelEdit}>Cancelar</button>
            <hr />
          </div>
        ) : (
          incomingPosts && (
            <div>
              <p>
                <strong>ID del post:</strong> {post.uid}
              </p>
              <p>
                <strong>ID del autor:</strong> {post.authorID}
              </p>
              <p>
                <strong>{post.username}</strong> publicó el{" "}
                {post.createdAt
                  .toDate()
                  .toLocaleString()
                  .slice(0, 9)}
                a las
                {post.createdAt
                  .toDate()
                  .toLocaleString()
                  .slice(-9, -1)}{" "}
                hrs.
              </p>
              <p>
                <i>{post.text} </i>
              </p>
              <ImageFromPost src={post.images.imageUrl} />
              <p />
              {post.editedAt && (
                <i>
                  Editado el{" "}
                  {post.editedAt
                    .toDate()
                    .toLocaleString()
                    .slice(0, 9)}{" "}
                  a las
                  {post.editedAt
                    .toDate()
                    .toLocaleString()
                    .slice(-9, -1)}{" "}
                  hrs.
                </i>
              )}
              <p>
                <span role="img" aria-label="Books">
                  📚
                </span>{" "}
                Books: {post.bookIt}
              </p>
              <button onClick={() => bookIt(post)}>
                I{" "}
                <span role="img" aria-label="Book">
                  📖
                </span>{" "}
                it!
              </button>
              {authUser.uid === post.authorID && (
                <div>
                  <button onClick={this.editPost}>Editar Post</button>
                  <button onClick={() => deletePost(post)}>Borrar Post</button>
                </div>
              )}

              <hr />
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}

export default PostItem;
