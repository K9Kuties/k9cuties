import React, { Component } from 'react';
import './Message.css';
import axios from 'axios';
import SpeechBubbles from '../../speech-bubbles.svg';
import {connect} from 'react-redux';
import { getMessages, updateMessages, getUser, getDog } from './../../ducks/users';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

class Message extends Component {
    constructor(props) {
      super(props)
      this.state = {
        message: '',
        dog2Name: '',
        dog2Pic: ''
      }
      this.submitMessage = this.submitMessage.bind(this)
      this.handleKeyPress = this.handleKeyPress.bind(this)
      this.updateMessages = this.updateMessages.bind(this)
      this.joinRoom = this.joinRoom.bind(this)
      this.unmatch = this.unmatch.bind(this)
    }

  componentDidMount() {
    axios.get('/auth/me').then(res => {
      this.props.getUser(res.data.user);
      axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
          if (res.data[0].dog_id !== +this.props.match.params.userOne) {
            this.props.history.push('/')
          }
          this.props.getDog(res.data[0])
      })
      axios.get(`/api/getDogByDogId/${this.props.match.params.userTwo}`).then( res => {
        this.setState({
          dog2Name: res.data[0].name,
          dog2Pic: res.data[0].img1
        })
      })
  })
    this.props.getMessages(this.props.match.params.userOne, this.props.match.params.userTwo)
    this.socket = io('/');
    this.socket.on('message dispatched', this.updateMessages);
    this.joinRoom();
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  updateMessages(messages) {
    this.props.updateMessages(messages)
  }

  submitMessage() {
    var room;
    if (+this.props.match.params.userOne > +this.props.match.params.userTwo) {
      room = `user${this.props.match.params.userOne}chattingwith${this.props.match.params.userTwo}`
    } else {
      room = `user${this.props.match.params.userTwo}chattingwith${this.props.match.params.userOne}`
    }
    this.socket.emit('message sent', {
      room: room,
      userOne: this.props.match.params.userOne,
      userTwo: this.props.match.params.userTwo,
      message: this.state.message
    })

    this.setState({
      message: ''
    })
  }

  joinRoom() {
    var room;
    if (+this.props.match.params.userOne > +this.props.match.params.userTwo) {
      room = `user${this.props.match.params.userOne}chattingwith${this.props.match.params.userTwo}`
    } else {
      room = `user${this.props.match.params.userTwo}chattingwith${this.props.match.params.userOne}`
    }
    this.socket.emit('join room', {
      room: room
    })
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.submitMessage()
    }
  }

  unmatch() {
    axios.post(`/api/unmatch`, { userOne: this.props.match.params.userOne, userTwo: this.props.match.params.userTwo })
    this.props.history.push('/matches')
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
          <Link to='/matches' ><img className='chat_svg' src={SpeechBubbles} alt='chat logo' /></Link>
          <img className='dog2Pic' src={this.state.dog2Pic} />
          <p>{this.state.dog2Name}</p>
          <button onClick={this.unmatch} >Unmatch</button>
        </div>
        <div className="chat_window" ref={(div) => {this.messageList = div}}>
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

export default connect(mapStateToProps, { getMessages, updateMessages, getUser, getDog })(Message);