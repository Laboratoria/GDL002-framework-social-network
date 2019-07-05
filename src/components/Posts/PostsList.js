import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const ImageFromPost = styled.img`
  max-width: 15rem;
`;

class APostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      posts: [],
      limit: 5
    };
  }

  onListenForMessages = () => {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .posts()
      .orderBy("createdAt", "desc")
      .limit(this.state.limit)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.size) {
          var post = [];
          querySnapshot.docs.map(e => {
            const postsincome = { postID: e.id, postData: e.data() };
            post.push(postsincome);
            return post;
          });
          this.setState({ posts: post, loading: false });
        } else {
          this.setState({ posts: null, loading: false });
        }
      });
  };

  componentDidMount() {
    this.onListenForMessages();

    // this.setState({ loading: true });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages
    );
  };

  render() {
    const { posts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authorUser => (
          <div>
            <h2>Posts Recientes</h2>

            <div>
              {posts.map(post => (
                <div key={post.postID}>
                  <p>
                    <strong>ID del post:</strong> {post.postID}
                  </p>
                  <p>
                    <strong>ID del autor:</strong> {post.postData.authorID}
                  </p>
                  <p>
                    <strong>{post.postData.username}</strong> publicó el
                    <i> {post.postData.createdAt.toDate().toString()}</i>
                  </p>
                  <p>
                    <i>{post.postData.text}</i>
                  </p>
                  <ImageFromPost src={post.postData.images.imageUrl} />
                  <p />
                  <hr />
                </div>
              ))}
            </div>
            {!loading && posts && (
              <button type="button" onClick={this.onNextPage}>
                Más Posts
              </button>
            )}
            {loading && (
              <div>
                Cargando ...
                <Loader
                  type="ThreeDots"
                  color="#75b6ff"
                  height="100"
                  width="100"
                />
              </div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(APostList);
