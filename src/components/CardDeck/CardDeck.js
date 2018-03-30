import React, { Component } from 'react';
import Card from '../Card/Card';

export default class CardDeck extends Component {
  render() {
    let {cards} = this.props
    return <div className="CardDeck">
      {cards && cards.slice(0).reverse().map((card, idx)=> {
        return <Card imgUrl={card.img1} idx={idx} shiftCard={this.props.shiftCard} key={idx} />
      })}
    </div>
  }
}
