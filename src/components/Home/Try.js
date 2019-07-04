import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const ImageFromPost = styled.img`
  width: 15rem;
`;

class postList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      posts: [],
      posts2: [],
      limit: 3
    };
  }
  // onListenForMessages = () => {
  //   this.setState({ loading: true });

  //   this.props.firebase
  //     .posts()
  //     .orderByChild("createdAt")
  //     .limitToLast(this.state.limit)
  //     .on("value", snapshot => {
  //       const messageObject = snapshot.val();

  //       if (messageObject) {
  //         const messageList = Object.keys(messageObject).map(key => ({
  //           ...messageObject[key],
  //           uid: key
  //         }));

  //         this.setState({
  //           posts2: messageList,
  //           loading: false
  //         });
  //       } else {
  //         this.setState({ posts2: null, loading: false });
  //       }
  //     });
  // };
  componentDidMount() {
    // this.onListenForMessages();
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .posts()
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        var post = [];

        querySnapshot.docs.map(e => {
          const postsincome = { postID: e.id, postData: e.data() };
          post.push(postsincome);
          return post;
        });
        this.setState({ posts: post, loading: false });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { posts, loading } = this.state;

    return (
      <div>
        <h2>Posts Recientes</h2>
        {loading && (
          <div>
            Cargando ...
            <Loader type="ThreeDots" color="#75b6ff" height="100" width="100" />
          </div>
        )}
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
                {/* <i> {post.postData.firebaseDate.toDate().toString()}</i> a las */}
                {/* <i> {post.postData.createdAt.time}</i> hrs: */}
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
      </div>
    );
  }
}

export default withFirebase(postList);
