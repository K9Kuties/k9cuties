import React, { Component } from 'react';
import './AddDogInfo.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, submitNewDog } from './../../ducks/users';
import Header from '../Header/Header';

class AddDogInfo extends Component {
    constructor() {
        super()
        this.state = {
            dogName: '',
            dogBreed: '',
            dogAge: 0,
            dogGender: '',
            latitude: '',
            longitude: ''
        }
        this.submitNewDog = this.submitNewDog.bind(this);
        this.getMyLocation = this.getMyLocation.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
        this.getMyLocation();
    }
    
    getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
        location.getCurrentPosition((position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
        }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
        })
    }

    }

    submitNewDog() {
        console.log(this.state.latitude, this.state.longitude)
        this.props.submitNewDog({ userId: this.props.userData.id, dogName: this.state.dogName, dogBreed: this.state.dogBreed, dogAge: this.state.dogAge, dogGender: this.state.dogGender, latitude: this.state.latitude, longitude: this.state.longitude })
    }

    render() {

        return (
            <div className='AddDogInfo' >

                <Header />

                <div className='add_dog_info_h2_container' >
                    <h2 className='add_dog_info_h2' >Fill out your dogs information</h2>
                </div>

                <div className='add_dog_info_input_container' >
                    <input className='add_dog_info_dog_name_input' type='text' placeholder=' Name' value={this.state.dogName} onChange={(e) => { this.setState({ dogName: e.target.value }) }} required />
                    <hr />
                    <input className='add_dog_info_dog_breed_input' type='text' placeholder=' Breed' value={this.state.dogBreed} onChange={(e) => { this.setState({ dogBreed: e.target.value }) }} required />
                    <hr />
                    <select className='add_dog_info_dog_age_select' value={this.state.dogAge} onChange={(e) => { this.setState({ dogAge: e.target.value }) }} required>
                        <option default hidden >Age</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                        <option value='19'>19</option>
                        <option value='20'>20</option>
                    </select>
                    <hr />
                    <select className='add_dog_info_dog_gender_select' value={this.state.dogGender} onChange={(e) => { this.setState({ dogGender: e.target.value }) }} required>
                        <option default hidden>Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                    <hr />
                </div>

                <Link to='/uploadimage'><button className='add_dog_info_next_button' onClick={this.submitNewDog}>Next</button></Link>

                <div className='add_dog_info_dots' >
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_grey'></div>
                    <div className='add_dog_info_dot_grey'></div>
                    <div className='add_dog_info_dot_grey'></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, { getUser, submitNewDog })(AddDogInfo);



{/* <a href='http://localhost:3005/logout'><button>Logout</button></a> */ }