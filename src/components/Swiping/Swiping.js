import React, { Component } from 'react';
import './Swiping.css';
import Swipeable from 'react-swipeable';
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
          let swipeArray = axios.get(`/api/getSwipeArray/${res.data[0].dog_id}/${res.data[0].latitude}/${res.data[0].longitude}/${res.data[0].radius}`).then(res => {
              console.log(res.data)
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

    // console.log('this.state.swipearray', this.state.swipeArray)
    // const cardStack = this.state.swipeArray.map((slide, index) => {
    //       return 
    //   })

    return (
      <div className="Swiping">
        <div className="slide_container">
          <CardDeck cards={this.state.swipeArray} shiftCard={this.shiftCard.bind(this)} />
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