import React, { Component } from "react";
import styled from "styled-components";

const ImageFromPost = styled.img`
  max-width: 15rem;
`;

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }
  render() {
    const { incomingPosts, authorUser } = this.props;
    return (
      <div>
        {incomingPosts &&
          incomingPosts.map(post => (
            <div key={post.uid}>
              <p>
                <strong>ID del post:</strong> {post.uid}
              </p>
              <p>
                <strong>ID del autor:</strong> {post.authorID}
              </p>
              <p>
                <strong>{post.username}</strong> publicó el
                <i> {post.createdAt.toDate().toString()}</i>
              </p>
              <p>
                <i>{post.text}</i>
              </p>
              <ImageFromPost src={post.images.imageUrl} />
              <p />
              {authorUser.uid === post.authorID && <button>Editar</button>}
              <hr />
            </div>
          ))}
      </div>
    );
  }
}

export default PostItem;
