import React, { Component } from 'react';
import './Settings.css';
import axios from 'axios';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import { connect } from 'react-redux';
import { getDog, updateRadius, updateInterestedIn, updateReason, updateRange } from './../../ducks/users';
import BackArrow from '../../back-arrow.svg';
import InputRange from 'react-input-range';
import '../../react-input-range.css';


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radiusRange: this.props.dog.radius,
            value: { min: this.props.dog.age_begin, max: this.props.dog.age_end },
            reason: this.props.dog.reason,
            selectedType: this.props.dog.interested_in
        }

        this.handleInterestedInChange = this.handleInterestedInChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/getDog/${this.props.user.id}`).then(res => {
            this.setState({
                selectedType: res.data[0].interested_in,
                reason: res.data[0].reason,
                value: { min: res.data[0].age_begin, max: res.data[0].age_end },
                radiusRange: res.data[0].radius
            })
            this.props.getDog(res.data[0])
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

        const { radiusRange } = this.state;
        const { ageRange } = this.state;

        return (
            <div className="Settings">
                <div className='settings_header' >
                    <a><img className='back_arrow_svg' src={BackArrow} alt='back arrow logo' /></a>
                    <h1 className='settings_header_h1' >Settings</h1>
                </div>
                <div className='my_location' >
                    <div className='my_location_title' >My Location</div>
                </div>
                <div className='radius' >
                    <h2 className='radius_h2' >Search radius</h2>
                    <div className='radiusRange'>within {radiusRange} miles</div>
                    <Slider
                        min={0}
                        max={100}
                        value={radiusRange}
                        step={1}
                        orientation={'horizontal'}
                        tooltip={true}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>
                <form className='male_or_female'>
                    <label className='male_or_female_label' >Male</label><input className='radio_button' type='radio' value='Male' checked={this.state.selectedType === 'Male'} onChange={this.handleInterestedInChange} />
                    <label className='male_or_female_label'>Female</label><input className='radio_button' type='radio' value='Female' checked={this.state.selectedType === 'Female'} onChange={this.handleInterestedInChange} />
                    <label className='male_or_female_label'>Both</label><input className='radio_button' type='radio' value='Both' checked={this.state.selectedType === 'Both'} onChange={this.handleInterestedInChange} />
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
                    <label className='reason_label' >Play Dates</label><input className='radio_button' type='radio' value='Play dates' checked={this.state.reason === 'Play dates'} onChange={this.handleReasonChange} />
                    <label className='reason_label'>Breeding</label><input className='radio_button' type='radio' value='Breeding' checked={this.state.reason === 'Breeding'} onChange={this.handleReasonChange} />
                </form>
                <div className='delete_account_container' >
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

export default connect(mapStateToProps, { getDog, updateRadius, updateInterestedIn, updateReason, updateRange })(Settings);