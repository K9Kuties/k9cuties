import React, { Component } from 'react';
import './Settings.css';
import axios from 'axios';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRadius, updateInterestedIn, updateReason, updateRange, getUser, getDog } from './../../ducks/users';
import BackArrow from '../../back-arrow.svg';
import InputRange from 'react-input-range';
import '../../react-input-range.css';
import placeholder from '../../placeholder.svg'

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radiusRange: 0,
            value: { min: 0, max: 0 },
            reason: '',
            selectedType: '',
            city: '',
            currentState: ''
        }

        this.handleInterestedInChange = this.handleInterestedInChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                this.setState({
                    selectedType: res.data[0].interested_in,
                    reason: res.data[0].reason,
                    value: { min: res.data[0].age_begin, max: res.data[0].age_end },
                    radiusRange: res.data[0].radius
                })
                this.props.getDog(res.data[0])
            }).then(res=>{
                axios.get(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${this.props.dog.latitude}&lng=${this.props.dog.longitude}&username=sgueck9`).then(response =>{
                    console.log('response', response)
                    console.log('latitude', this.props.dog.latitude)
                    this.setState({ currentState : response.data.geonames[0].adminCode1, city: response.data.geonames[0].toponymName })
                })
            }) 
        })
    }

    //These are functions for the Radius Slider

    handleChange = radiusRange => {
        this.setState({
            radiusRange
        })
    };

    handleChangeComplete = () => {
        this.props.updateRadius(this.props.dog.dog_id, this.state.radiusRange)
    };
    //End of Radius Slider functions

    //These are functions for the Age Slider

    handleChangeAge = (value) => {
        this.setState({
            value
        })
    }

    handleChangeAgeComplete = () => {
        console.log('Change Age Finished')
        console.log(this.state.value)
        this.props.updateRange(this.props.dog.dog_id, this.state.value)
    }
    //End of Age Slider functions

    //These are functions for the genders
    handleInterestedInChange(e) {
        this.setState({
            selectedType: e.target.value
        }, () => { this.props.updateInterestedIn(this.props.dog.dog_id, this.state.selectedType) })
    }
    //End of gender functions

    handleReasonChange(e) {
        this.setState({
            reason: e.target.value
        }, () => { this.props.updateReason(this.props.dog.dog_id, this.state.reason) })
    }

    deleteAccount() {
        if (window.confirm('Are you sure you wish to delete your account?')) {
            axios.delete(`/api/deleteAccount/${this.props.dog.dog_id}`).then(res => {
                this.props.history.push('/')
            })
        }
    }

    render() {

        return (
            <div className="Settings">
                <div className='settings_header' >
                    <Link to='/profile' ><img className='back_arrow_svg' src={BackArrow} alt='back arrow logo' /></Link>
                    <h1 className='settings_header_h1' >Settings</h1>
                </div>
                <div className='my_location' >
                    <h1 className='location_h1' >Location</h1>
                    <div className='my_location_title' ><img src={placeholder} alt='pin' className='placeholder_svg' /> {this.state.city}, {this.state.currentState}</div>
                </div>
                <div className='radius' >
                    <h2 className='radius_h2' >Search radius</h2>
                    <div className='radiusRange'>within {this.state.radiusRange} miles</div>
                    <Slider
                        min={0}
                        max={100}
                        value={this.state.radiusRange}
                        step={1}
                        orientation={'horizontal'}
                        tooltip={true}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>
                <form className='male_or_female'>
                    <h5 className='interested_in' >Interested in</h5>
                    <input className='radio_button' type='radio' name='process' value='Male' id='male' checked={this.state.selectedType === 'Male'} onChange={this.handleInterestedInChange} /><label className='male_or_female_label' for='male' >Male</label>
                    <input className='radio_button' type='radio' name='process' value='Female' id='female' checked={this.state.selectedType === 'Female'} onChange={this.handleInterestedInChange} /><label className='male_or_female_label' for='female' >Female</label>
                    <input className='radio_button' type='radio' name='process' value='Both' id='both' checked={this.state.selectedType === 'Both'} onChange={this.handleInterestedInChange} /><label className='male_or_female_label' for='both' >Both</label>
                </form>
                <div className='age_range' >
                    <h2 className='age_range_h2' >Age range </h2>
                    <InputRange
                        maxValue={20}
                        minValue={0}
                        value={this.state.value}
                        onChangeStart={this.handleChangeAgeStart}
                        onChange={this.handleChangeAge} 
                        onChangeComplete={this.handleChangeAgeComplete} />
                </div>
                <form className='reason' >
                    <h5 className='reason_for' >Looking for</h5>
                    <label className='reason_label' for='play_dates' >Play Dates</label><input className='radio_button' type='radio' value='Play dates' checked={this.state.reason === 'Play dates'} onChange={this.handleReasonChange} />
                    <label className='reason_label' for='breeding' >Breeding</label><input className='radio_button' type='radio' value='Breeding' checked={this.state.reason === 'Breeding'} onChange={this.handleReasonChange} />
                </form>
                <div className='delete_account_container'>
                    <button className='delete_account_button' onClick={() => { this.deleteAccount(this.props.dog.dog_id) }}>Delete my account</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        dog: state.dog
    }
}

export default connect(mapStateToProps, { updateRadius, updateInterestedIn, updateReason, updateRange, getUser, getDog })(Settings);