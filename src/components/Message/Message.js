import React, { Component } from 'react';
import axios from 'axios';
import './Message.css';

class Message extends Component {

    componentDidMount() {
        this.props.getMessages(this.props.match.params.userOne, this.props.match.params.userTwo)
    }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default Message;