import React, { Component } from 'react'
import axios from 'axios';
import interact from 'interactjs'
import TWEEN from '@tweenjs/tween.js'
import { connect } from 'react-redux';
import { likeDog, unlikeDog } from './../../ducks/users';
import heart from '../../heart.svg';
import xButton from '../../x-button.svg';

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

class Card extends Component {
  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0,
      mainPicture: ''
    }
    this.changePictureLeft = this.changePictureLeft.bind(this)
    this.changePictureRight = this.changePictureRight.bind(this)
  }

  componentDidMount() {
    this.setState({
      mainPicture: this.props.img1
    })
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
    var x = (parseFloat(this.state.x) || 0) + event.dx,
      y = (parseFloat(this.state.y) || 0) + event.dy;
    // update the posiion attributes
    this.setState({ x, y })
  }

  handleDragEnd(event) {
    //event.pageX = where mouse is when unclicked
    let positionX = event.pageX;
    let card = this
    let leftBound = window.innerWidth / 4.65
    //window.innerWidth = width of screen
    let rightBound = window.innerWidth / 1.3

    //did not swipe
    if (positionX < rightBound && positionX > leftBound) {
      var coords = { x: this.state.x, y: this.state.y }
      var tween = new TWEEN.Tween(coords)
      tween.to({ x: 0, y: 0 }, 250)
      tween.onUpdate(function () {
        card.setState({ x: coords.x, y: coords.y })
      })
      tween.start();

      //swiping right
    } else if (positionX > rightBound) {
      var coords = { x: this.state.x, y: this.state.y }
      var tween = new TWEEN.Tween(coords)
      tween.to({ x: window.innerWidth+1000, y: 500 }, 2000)
      tween.onUpdate(function () {
        card.setState({ x: coords.x, y: coords.y })
      })
      tween.start();
      axios.get(`/api/isItAMatch?id=${this.props.dog.dog_id}&otherId=${this.props.cardDogId}`).then(res => {
        console.log(res.data)
        if (res.data === true) {
          this.props.showModal({id: this.props.dog.dog_id, picture: this.props.dog.img1}, {id: this.props.cardDogId, name: this.props.name, picture: this.props.img1})
        } 
      })
      this.props.likeDog(this.props.dog.dog_id, this.props.cardDogId)
      setTimeout(() => {
        this.props.shiftCard()
      }, 2500); 
      console.log('swiped right')

      //swiping left
    } else if (positionX < leftBound) {
      var coords = { x: this.state.x, y: this.state.y }
      var tween = new TWEEN.Tween(coords)
      tween.to({ x: (window.innerWidth-window.innerWidth)-1000, y: 500 }, 2000)
      tween.onUpdate(function () {
        card.setState({ x: coords.x, y: coords.y })
      })
      tween.start();
      this.props.unlikeDog(this.props.dog.dog_id, this.props.cardDogId)
      setTimeout(() => {
        this.props.shiftCard()
      }, 2500); 
      console.log('swiped left')
    }
  }

  changePictureLeft() {
    if (this.state.mainPicture === this.props.img1 && this.props.img1) {
        this.setState({
            mainPicture: this.props.img1
        })
    } else if (this.state.mainPicture === this.props.img2 && this.props.img1) {
        this.setState({
            mainPicture: this.props.img1
        })
    } else if (this.state.mainPicture === this.props.img3 && this.props.img2) {
        this.setState({
            mainPicture: this.props.img2
        })
    } else if (this.state.mainPicture === this.props.img4 && this.props.img3) {
        this.setState({
            mainPicture: this.props.img3
        })
    } else if (this.state.mainPicture === this.props.img5 && this.props.img4) {
        this.setState({
            mainPicture: this.props.img4
        })
    } else if (this.state.mainPicture === this.props.img6 && this.props.img5) {
        this.setState({
            mainPicture: this.props.img5
        })
    }
  }

  changePictureRight() {
    if (this.state.mainPicture === this.props.img1 && this.props.img2) {
        this.setState({
            mainPicture: this.props.img2
        })
    } else if (this.state.mainPicture === this.props.img2 && this.props.img3) {
        this.setState({
            mainPicture: this.props.img3
        })
    } else if (this.state.mainPicture === this.props.img3 && this.props.img4) {
        this.setState({
            mainPicture: this.props.img4
        })
    } else if (this.state.mainPicture === this.props.img4 && this.props.img5) {
        this.setState({
            mainPicture: this.props.img5
        })
    } else if (this.state.mainPicture === this.props.img5 && this.props.img6) {
        this.setState({
            mainPicture: this.props.img6
        })
    } else if (this.state.mainPicture === this.props.img6 && this.props.img6) {
        this.setState({
            mainPicture: this.props.img6
        })
    }
  }

  render() {

    let { x, y } = this.state
    let cardStyle = {
      transform: 'translate(' + x + 'px, ' + y + 'px)',
      touchAction: 'none'
    }

    return  <div id={"poop" + this.props.idx} className="Card" style={cardStyle} >
            <img src={this.state.mainPicture} alt="me" />
            <div className='left_picture1' onClick={this.changePictureLeft} ></div>
            <div className='right_picture1' onClick={this.changePictureRight} ></div>
            <div className='card_deets'>
              <div>
                <h2>{this.props.name}, {this.props.age}</h2>
                <h3>{this.props.gender} - {this.props.breed}</h3>
              </div>
              <h2>I</h2>
            </div>
            <div className='like_unlike_buttons'>
              <img src={xButton} alt="dislike button" height='100px' width='100px' onClick={
                (event) => {
                  let positionX = event.pageX;
                  let card = this
                  let leftBound = window.innerWidth / 4.65
                  let rightBound = window.innerWidth / 1.3
                  var coords = { x: this.state.x, y: this.state.y }
                  var tween = new TWEEN.Tween(coords)
                  tween.to({ x: (window.innerWidth-window.innerWidth)-1000, y: 500 }, 2000)
                  tween.onUpdate(function () {
                    card.setState({ x: coords.x, y: coords.y })
                  })
                  tween.start();
                  this.props.unlikeDog(this.props.dog.dog_id, this.props.cardDogId); 
                  setTimeout(() => {
                    this.props.shiftCard()
                  }, 2500); 
                }}/>
              <img src={heart} alt="like button" height='100px' width='100px' onClick={
                (event) => {
                  let positionX = event.pageX;
                  let card = this
                  let leftBound = window.innerWidth / 4.65
                  let rightBound = window.innerWidth / 1.3
                  var coords = { x: this.state.x, y: this.state.y }
                  var tween = new TWEEN.Tween(coords)
                  tween.to({ x: window.innerWidth+1000, y: 500 }, 2000)
                  tween.onUpdate(function () {
                    card.setState({ x: coords.x, y: coords.y })
                  })
                  tween.start();
                  axios.get(`/api/isItAMatch?id=${this.props.dog.dog_id}&otherId=${this.props.cardDogId}`).then(res => {
                    if (res.data === true) {
                      this.props.showModal({id: this.props.dog.dog_id, picture: this.props.dog.img1}, {id: this.props.cardDogId, name: this.props.name, picture: this.props.img1})
                    } 
                  })
                  this.props.likeDog(this.props.dog.dog_id, this.props.cardDogId); 
                  setTimeout(() => {
                    this.props.shiftCard()
                  }, 2000); 
                }}/>
            </div>
          </div>   
  }
}

export default connect(null, { likeDog, unlikeDog })(Card);