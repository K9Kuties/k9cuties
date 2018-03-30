import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './AddDescription.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitDescription, getUser, getDog } from './../../ducks/users';

class AddDescription extends Component {
    constructor() {
        super()
        this.state = {
            description: ''
        }
        this.submitDescription = this.submitDescription.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
            })
        })
    }

    submitDescription() {
        this.props.submitDescription(this.props.dog.dog_id, this.state.description)
        this.setState({
            description: ''
        })
    }

    render(){

        return(
            <div>
                <div className='descMain'>
                    <div>
                        <Header/>
                    </div>
                    <div className='descDesc'>Add a description of your dog</div>
                    <textarea name='text' className='descriptInput' placeholder='Example: Spike loves playing at the park and he loves long walks on the beach' value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} />
                    <Link to='/dogcreated'><button className='nextBut' onClick={this.submitDescription} >Next</button></Link>
                </div>

                <div className='add_dog_info_dots' >
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_blue'></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog
    }
}

export default connect(mapStateToProps, { submitDescription, getUser, getDog })(AddDescription);