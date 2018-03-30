import React, { Component } from 'react'
import interact from 'interactjs'
import TWEEN from '@tweenjs/tween.js'

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0
    }
  }

  componentDidMount() {
    let inter = interact('#poop' + this.props.idx)
    inter.draggable({
      inertia: {
        resistance: 20,
        minSpeed: 150,
        endSpeed: 100
      },
      onmove: this.handleDrag.bind(this),
      onend: this.handleDragEnd.bind(this)
    })

    requestAnimationFrame(animate);
  }

  handleDrag(event) {
    // console.log('handle drag', this.state)
    var x = (parseFloat(this.state.x) || 0) + event.dx,
      y = (parseFloat(this.state.y) || 0) + event.dy;
    // update the posiion attributes
    this.setState({ x, y })
  }

  handleDragEnd(event) {
    console.log('handle drag end', this.state)
    //event.pageX = where mouse is when unclicked
    let positionX = event.pageX;
    console.log('event.pagex', event.pageX)
    let card = this
    console.log('card', card)
    let leftBound = window.innerWidth / 4.65
    //window.innerWidth = width of screen
    let rightBound = window.innerWidth / 1.3
    console.log('rightBound', rightBound)


    //did not swipe
    if (positionX < rightBound && positionX > leftBound) {
      var coords = { x: this.state.x, y: this.state.y }
      var tween = new TWEEN.Tween(coords)
      tween.to({ x: 0, y: 0 }, 250)
      tween.onUpdate(function () {
        card.setState({ x: coords.x, y: coords.y })
      })
      tween.start();
      console.log('did not swipe')

      //swiping right
    } else if (positionX > rightBound) {
      var coords = { x: this.state.x, y: this.state.y }
      var tween = new TWEEN.Tween(coords)
      tween.to({ x: window.innerWidth+1000, y: 500 }, 2500)
      tween.onUpdate(function () {
        card.setState({ x: coords.x, y: coords.y })
      })
      tween.start();
      setTimeout(() => {
        this.props.shiftCard()
      }, 2500); 
      console.log('swiped right')

      //swiping left
    } else if (positionX < leftBound) {
      var coords = { x: this.state.x, y: this.state.y }
      var tween = new TWEEN.Tween(coords)
      tween.to({ x: (window.innerWidth-window.innerWidth)-1000, y: 500 }, 2500)
      tween.onUpdate(function () {
        card.setState({ x: coords.x, y: coords.y })
      })
      tween.start();
      setTimeout(() => {
        this.props.shiftCard()
      }, 2500); 
      console.log('swiped left')
    }
  }

  render() {
    let { x, y } = this.state
    let cardStyle = {
      transform: 'translate(' + x + 'px, ' + y + 'px)',
      touchAction: 'none'
    }

    return <div id={"poop" + this.props.idx} className="Card" style={cardStyle} >
      <img src={this.props.imgUrl} alt="me" />
    </div>
  }
}