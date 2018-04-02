import React, { Component } from 'react';
import './Swiping.css';
import { connect } from 'react-redux';
import { getUser, getDog } from './../../ducks/users';
import axios from 'axios';
import CardDeck from '../CardDeck/CardDeck';


class Swiping extends Component {
  constructor() {
    super()
    this.state = {
      swipeArray: [],
      currentSlide: 0,
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
  
  render() {

    return (
      <div className="Swiping">
        <div className="slide_container">
          <CardDeck cards={this.state.swipeArray} dog={this.props.dog} shiftCard={this.shiftCard.bind(this)} />
        </div>
        <div className='swiping_buttons_container' >
          <button>X</button>
          <button>Y</button>
        </div>
      </div>
    );
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