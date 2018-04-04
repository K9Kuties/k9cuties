import React, { Component } from 'react'
import './Profile.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, getDog } from './../../ducks/users';
import paw2 from '../../paw (2).svg'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            pictureImg: ''
        }
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                this.setState({
                    pictureImg: res.data[0].img1
                })
            })
        })
    }


    render() {
        return (
            <div className='profDiv'>

                <div className='profile_header' >
                    <h1 className='invisible' ></h1>
                    <h1 className='profile_header_h1' >Profile</h1>
                    <Link to='/swiping' ><img className='paw2' src={paw2} alt='back arrow logo' /></Link>
                </div>

                <div className='profile_information' >
                    <img className='profilePic' src={this.state.pictureImg} alt='Profile Pic' />
                    <div className='NameAndAge' >
                        <div className='nameAnd'>{this.props.dog.name}, {this.props.dog.age}</div>
                    </div>
                </div>

                <div className='profile_buttons' >
                    <Link to='/editinfo' ><button className='editBut'>Edit</button></Link>
                    <Link to='/settings' ><button className='profileBut'>Settings</button></Link>
                </div>

                <a href='http://localhost:3005/logout' ><button className='profile_logBut' >Logout</button></a>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog
    }
}

export default connect(mapStateToProps, { getUser, getDog })(Profile);