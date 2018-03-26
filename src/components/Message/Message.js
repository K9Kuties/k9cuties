import React, { Component } from 'react';
import axios from 'axios';
import './Message.css';
import {connect} from 'react-redux';
import { getMessages, submitMessage } from './../../ducks/users';

class Message extends Component {
    constructor() {
      super()
      this.state = {
        message: ''
      }
      this.submitMessage = this.submitMessage.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }
    componentDidMount() {
      this.props.getMessages(this.props.match.params.userOne, this.props.match.params.userTwo)
    }


  submitMessage() {
    if (this.state.message) {
    this.props.submitMessage(this.props.match.params.userOne, this.props.match.params.userTwo, this.state.message)
    this.setState({
      message: ''
    })
  }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.submitMessage()
    }
  }

  render() {

    var messagesToDisplay = this.props.messages.map((message, index) => {
      if (message.sending_user_id === +this.props.match.params.userOne) {
        return (
          <div key={index} className="chat_entry_me">
            <p>{message.message_body}</p>
          </div>
        ) 
      } else {
          return (
            <div key={index} className="chat_entry_other">
              <p>{message.message_body}</p>
            </div>
          )
        }
    })

    return (
      <div className="message">
        <div className="chat_header">
          <button>Back</button>
          <p>Monica</p>
          <button>Settings</button>
        </div>
        <div className="chat_window">
          {messagesToDisplay}
        </div>
        <div className="chat_input">
          <input className="chat_message" placeholder="Type a message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} onKeyPress={this.handleKeyPress}/>
          <button onClick={this.submitMessage}>Send</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps, { getMessages, submitMessage })(Message);