import React, { Component } from 'react';
import './Matches.css';
import axios from 'axios';
import SpeechBubbles from '../../speech-bubbles.svg';
import PawPrint from '../../paw-print.svg';
import NoDogs from '../../no-dogs.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMatches, getUser, getDog } from './../../ducks/users';
import DogAvatar from '../../dog-avatar.svg';


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
        console.log('this.props.matches', this.props.matches.length)
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
                
                <div className='matches_header' >
                        <Link to='/swiping'><img className='paw_svg' src={PawPrint} alt='paw logo' /></Link>
                        <h4 className='matches_h4' >Matches</h4> 
                </div>

                { this.props.matches.length ? 

                <div>{matches}</div>
                :
                 <div className='no_matches' >
                    <img src={DogAvatar} className='dog_avatar' />
                    <h3 className='no_matches_h3' >No matches yet, get swiping!</h3>
                    <Link to='/swiping'><button className='no_matches_button' >Find new dogs</button></Link>
                 </div>

                }
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