import React, { Component } from 'react';
import './AddDogInfo.css';
import axios from 'axios';
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
            dogBirthdate: '', 
            dogGender: '',
            latitude: '',
            longitude: '',
            date: '',
            showDatePicker: false
        }
        this.submitNewDog = this.submitNewDog.bind(this);
        this.getMyLocation = this.getMyLocation.bind(this);
    }
    componentDidMount() {
        axios.get('/auth/me').then(res => {
            if (res.data.response[0]) {
                this.props.history.push('/swiping');
                this.props.getUser(res.data.user)
            } else {
                this.props.getUser(res.data.user);
            }
        })
        var date = new Date().toISOString().slice(0,10);
        this.setState({
            date: date,
            dogBirthdate: date
        })
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
        this.props.submitNewDog({ userId: this.props.userData.id, dogName: this.state.dogName, dogBreed: this.state.dogBreed, dogBirthdate: this.state.dogBirthdate, dogGender: this.state.dogGender, latitude: this.state.latitude, longitude: this.state.longitude })
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
                    {(this.state.showDatePicker)
                    ?
                    <input type='date' className='add_dog_info_dog_birthdate_input' min='1998-01-01' max={this.state.date} value={this.state.dogBirthdate} onBlur={() => {this.setState({ showDatePicker: false })}} onChange={(e) => {this.setState({ dogBirthdate: e.target.value })}}/>
                    :
                    <input type='text' className='add_dog_info_dog_birthdate_input' placeholder='Birthdate' onClick={() => {this.setState({ showDatePicker: true })}} onFocus={() => {this.setState({ showDatePicker: true })}} />
                    }
                    <hr />
                    <select className='add_dog_info_dog_gender_select' value={this.state.dogGender} onChange={(e) => { this.setState({ dogGender: e.target.value }) }} required>
                        <option default hidden>Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
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