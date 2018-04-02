import React, { Component } from 'react';
import './Header.css';
import PoochPals from '../../@0.5xpoochpals.svg';


class Header extends Component {


    render() {
        return (
            <header className='pooch_pals_header' >
                <img src={PoochPals} className='poochpals_svg_header' alt='header logo' />
            </header>
        )
    }
}

export default Header;