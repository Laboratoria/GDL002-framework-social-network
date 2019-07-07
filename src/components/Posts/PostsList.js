import React, { Component } from "react";
import PostItem from "./PostItem";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import Loader from "react-loader-spinner";

class PostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      incomingPosts: [],
      limit: 5
    };
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
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onNextPage = () => {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForPosts);
  };

  render() {
    const { incomingPosts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authorUser => (
          <div>
            <h2>Posts Recientes</h2>

            {loading && (
              <div>
                <Loader type="CradleLoader" />
              </div>
            )}

            {!loading && incomingPosts && (
              <div>
                <PostItem
                  incomingPosts={this.state.incomingPosts}
                  authorUser={authorUser}
                />
                <button type="button" onClick={this.onNextPage}>
                  Más Posts
                </button>
              </div>
            )}

            {!incomingPosts && <div>No hay posts! aún...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(PostsList);
