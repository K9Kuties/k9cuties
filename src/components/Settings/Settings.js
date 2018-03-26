import React, { Component } from 'react';
import './Settings.css';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import BackArrow from '../../back-arrow.svg';


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radiusRange: 50,
            ageRange: 1,
            male: false,
            female: false,
            both: true
        }

        this.changeToBoth = this.changeToBoth.bind(this);
        this.changeToMale = this.changeToMale.bind(this);
        this.changeToFemale = this.changeToFemale.bind(this);
    }

    //These are functions for the Radius Slider
    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleChange = radiusRange => {
        this.setState({
            radiusRange: radiusRange
        })
        console.log(this.state.radiusRange);
    };

    handleChangeComplete = () => {
        console.log('Change event completed')
    };
    //End of Radius Slider functions


    //These are functions for the Age Slider
    handleChangeStartAge = () => {
        console.log('Change event started')
    };

    handleChangeAge = ageRange => {
        this.setState({
            ageRange: ageRange
        })
        console.log(this.state.ageRange);
    };

    handleChangeCompleteAge = () => {
        console.log('Change event completed')
    };
    //End of Age Slider functions


    //These are functions for the genders
    changeToMale = (male, female, both) => {
        this.setState({
            male: male,
            female: false,
            both: false
        })
        console.log(this.state);
    }

    changeToFemale = (male, female, both) => {
        this.setState({
            male: false,
            female: female,
            both: false
        })
        console.log(this.state);
    }

    changeToBoth = (male, female, both) => {
        this.setState({
            male: false,
            female: false,
            both: true
        })
        console.log(this.state);
    }
    //End of gender functions


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


                <div className='male_or_female' >
                        <h2 className='male_or_female_h2' >Male</h2><input type='radio' name='male' value={this.state.male} onChange={() => this.changeToMale()} />
                        <h2 className='male_or_female_h2'>Female</h2><input type='radio' name='female' value={this.state.female} onChange={() => this.changeToFemale()} />
                        <h2 className='male_or_female_h2'>Both</h2><input type='radio' name='both' value={this.state.both} onChange={() => this.changeToBoth()} />
                </div>


                <div className='age_range' >
                <h2 className='age_range_h2' >Age range </h2>
                <div className='agerange'>0</div>
                <div className='ageRange'>{ageRange}</div>
                    <Slider
                        min={0}
                        max={20}
                        value={ageRange}
                        step={1}
                        orientation={'horizontal'}
                        tooltip={true}
                        onChangeStart={this.handleChangeStartAge}
                        onChange={this.handleChangeAge}
                        onChangeComplete={this.handleChangeCompleteAge}
                    />
                    
                </div>


                <div className='reason' >
                    <h2 className='reason_h2' >Play Dates</h2><input type='radio' name='play_dates' value='' />
                    <h2 className='reason_h2'>Breeding</h2><input type='radio' name='breeding' value='' />
                </div>

                <div className='delete_account_container' >
                    <button className='delete_account_button' >Delete my account</button>
                </div>

            </div>
        );
    }
}

export default Settings;