import React, { Component } from 'react';
import './Swiping.css';
import { connect } from 'react-redux';
import { getUser, getDog } from './../../ducks/users';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CardDeck from '../CardDeck/CardDeck';

class Swiping extends Component {
  constructor() {
    super()
    this.state = {
      swipeArray: [],
      currentSlide: 0,
      modalShow: false,
      matchDogOneId: 0,
      matchDogTwoId: 0,
      matchDogOnePicture: '',
      matchDogTwoPicture: '',
      matchDogTwoName: ''
    }
  }

  componentDidMount() {
    axios.get('/auth/me').then(res => {
      this.props.getUser(res.data.user);
      axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
          this.props.getDog(res.data[0])
          let swipeArray = axios.get(`/api/getSwipeArray?id=${res.data[0].dog_id}&latitude=${res.data[0].latitude}&longitude=${res.data[0].longitude}&radius=${res.data[0].radius}&interested_in=${res.data[0].interested_in}&reason=${res.data[0].reason}`).then(res => {
              this.setState({
                swipeArray: res.data
              })
          })
      })
    })
  }

  shiftCard() {
    let cards = this.state.swipeArray.slice()
    cards.splice(0,1)
    this.setState({
      swipeArray: cards
    })
  }

  showModal(id, otherId) {
    this.setState({
      modalShow: true,
      matchDogOneId: id.id,
      matchDogTwoId: otherId.id,
      matchDogOnePicture: id.picture,
      matchDogTwoPicture: otherId.picture,
      matchDogTwoName: otherId.name
    })
  }
  
  render() {

    return (
      <div>
        {
        (this.state.modalShow)
        ?
          <div className='modal'>
            <h1>IT'S A MATCH</h1>
            <h5>You and {this.state.matchDogTwoName} liked each other</h5>
            <div className='modal_images'>
              <img src={this.state.matchDogOnePicture} width='100px' height='100px' alt='your dog' />
              <img src={this.state.matchDogTwoPicture} width='100px' height='100px' alt='matched dog' />
            </div>
            <Link to={`/message/${this.state.matchDogOneId}/${this.state.matchDogTwoId}`}><button onClick={() => {this.setState({modalShow: false})}}>MESSAGE THEM</button></Link>
            <button onClick={() => {this.setState({modalShow: false})}}>KEEP SWIPING</button>
          </div>
        :
          <div className="Swiping">
          <div className="slide_container">
            <CardDeck cards={this.state.swipeArray} dog={this.props.dog} shiftCard={this.shiftCard.bind(this)} showModal={this.showModal.bind(this)} />
          </div>
          <div className='swiping_buttons_container' >
            <button>X</button>
            <button>Y</button>
          </div>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dogsToDisplay: state.dogsToDisplay,
    user: state.user,
    dog: state.dog
  }
}

export default connect(mapStateToProps, { getUser, getDog })(Swiping);