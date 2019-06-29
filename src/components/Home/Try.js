import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .messages()
      .onSnapshot(querySnapshot => {
        var message = [];

        querySnapshot.docs.map(e => {
          const messagesincome = { messageID: e.id, messageData: e.data() };
          message.push(messagesincome);
          return message;
        });
        this.setState({ messages: message, loading: false });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { messages, loading } = this.state;

    return (
      <div>
        <h2>messages</h2>
        {loading && <div>Loading ...</div>}
        <div>
          {console.log(this.state.messages)}
          {messages.map(message => (
            <div key={message.messageID}>
              <span>
                <strong>ID:</strong> {message.messageID}
              </span>
              <span>
                <strong>texto:</strong> {message.messageData.text}
              </span>
              <span>
                <strong>fecha:</strong>
                {message.messageData.createdAt.toDate().toString()}
              </span>
              <span />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withFirebase(MessageList);
