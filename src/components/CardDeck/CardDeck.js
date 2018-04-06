import React, { Component } from 'react';
import Card from '../Card/Card';
import './CardDeck.css';

export default class CardDeck extends Component {
  render() {
    let {cards, dog} = this.props
    return <div className="CardDeck">
      {cards && cards.slice(0).reverse().map((card, idx)=> {
        return <Card dog={dog} cardDogId={card.dog_id} img1={card.img1} img2={card.img2} img3={card.img3} img4={card.img4} img5={card.img5} img6={card.img6} name={card.name} breed={card.breed} birthdate={card.birthdate} gender={card.gender} description={card.description} idx={idx} shiftCard={this.props.shiftCard} showModal={this.props.showModal} key={idx} />
      })}
    </div>
  }
}
