import React, {Component} from 'react';
import Header from '../Header/Header';
import './AddDescription.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitDescription } from './../../ducks/users';

class AddDescription extends Component {
    constructor() {
        super()
        this.state = {
            description: ''
        }
        this.submitDescription = this.submitDescription.bind(this);
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
                    <Link to='/photospage'><button className='backBut'>Back</button></Link>
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

export default connect(mapStateToProps, { submitDescription })(AddDescription);