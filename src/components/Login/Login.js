import React, { Component } from 'react';
import './Login.css';
import PoochPalsTitle from '../../poochpals.svg';

export default class Login extends Component {
    render() {
        return (
            <div className='Login'>
                <div className='logo_container' >
                    <img className='pooch_pals_title' src={PoochPalsTitle} alt='pooch pals logo' />
                    <h1 className='connect_your_pooches' >Connect your pooches</h1>
                </div>
                <div className='login_container' >
                    <a href={process.env.REACT_APP_LOGIN}><button className='login_button' >Login</button></a>
                    <a href={process.env.REACT_APP_LOGIN}><h3 className='forgot_your_password' >Forgot your password?</h3></a>
                </div>
                <a href={process.env.REACT_APP_LOGIN}><h2 className='already_have_an_account' >Already have an account? Sign In</h2></a>
            </div>
        )
    }
}