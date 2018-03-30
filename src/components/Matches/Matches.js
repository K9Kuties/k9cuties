import React, { Component } from 'react';
import './Matches.css';
import axios from 'axios';
import ChatLogo from '../../chat.svg';
import PawLogo from '../../paw.svg';
import NoDogs from '../../no-dogs.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMatches, getUser, getDog } from './../../ducks/users';


class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                this.props.getMatches(res.data[0].dog_id)
            })
        })
    }

    render() {
        
        var matches = this.props.matches.map( (val, i) => {
            return (
                <Link key={i} to={`/message/${this.props.dog.dog_id}/${val.dog_id}`}><div className='matches_container' >
                    <img className='user_image' src={val.img1}></img>
                    <div className='user_name' >{val.name}</div>
                </div></Link>
            )
        })

        return (
           
            <div className="Matches">

                <div className='header' >
                        <Link to='/swiping'><img className='paw_svg' src={PawLogo} alt='paw logo' /></Link>
                        <img className='chat_svg' src={ChatLogo} alt='chat logo' />
                </div>

                <div>{matches}</div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog,
        user: state.user,
        matches: state.matches
    }
}

export default connect(mapStateToProps, { getMatches, getUser, getDog })(Matches);