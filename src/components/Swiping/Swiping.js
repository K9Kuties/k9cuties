import React, { Component } from 'react';
import './Swiping.css';
import Swipeable from 'react-swipeable';
import { connect } from 'react-redux';
import axios from 'axios';

class Swiping extends Component {
  constructor() {
    super()
    this.state = {
      swipeArray: ['Matt', 'Tanner', "Steven", "Dick", "Jane", "Gertrude", "Billy"],
      currentSlide: 0
    }
    this.swiping = this.swiping.bind(this)
    this.swipingRight = this.swipingRight.bind(this)
    this.swipingLeft = this.swipingLeft.bind(this)
    this.swiped = this.swiped.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.user.id)
    axios.get(`/api/getDog/${nextProps.user.id}`).then(res => {
      let swipeArray = axios.get(`/api/getSwipeArray/${res.data[0].dog_id}/${res.data[0].latitude}/${res.data[0].longitude}/${res.data[0].radius}`).then(res => {
        console.log(res)
      })
    })
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
  
  }
 
  swipingLeft(e, absX) {
    // e.target.className = 'swipe-left';  
  }

  swipingRight(e, absX) {
    // e.target.className = 'swipe-right';   
  }
 
  swiped(e, deltaX, deltaY, isFlick, velocity) {
    // if (isFlick) {
      if (deltaX > 0) {
        e.target.className = 'swipe-left';
      } else if (deltaX < 0) {
        e.target.className = 'swipe-right'; 
      }
      let id = e.target.id
      console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
      var tempArray = this.state.swipeArray.slice()
      tempArray.splice(id, 1)
      setTimeout(() => {
        this.setState({
          swipeArray: tempArray
        })
      }, 1000)
    // }
  }
  
  render() {

    this.cardStack = this.state.swipeArray.map((slide, index) => {
          return (<Swipeable
            className="card"
            key={index}
            id={index}
            style={{zIndex: index}}
            onSwiping={this.swiping}
            onSwipingLeft={this.swipingLeft}
            onSwipingRight={this.swipingRight}
            onSwiped={this.swiped}
            onSwipedUp={this.swipedRight} >
              {slide}
          </Swipeable>)
      })

console.log(this.cardStack)
    return (
      <div className="Swiping">
        <header className="Swiping-header">
          <h1 className="Swiping-title">Welcome to React</h1>
        </header>
        <p className="Swiping-intro">
          To get started, edit <code>src/Swiping.js</code> and save to reload.
        </p>
        <div className="slide_container">
          {this.cardStack}
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

export default connect(mapStateToProps)(Swiping);