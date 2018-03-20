import React, { Component } from 'react';
import './AddDogInfo.css'
import {connect} from 'react-redux';
import {getUser} from './../../ducks/users';

class AddDogInfo extends Component {

    componentDidMount() {
       this.props.getUser();
    }

    render() {
        console.log('got to page');
        return (
            <div>
                <a href='http://localhost:3005/logout'><button>Logout</button></a>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, {getUser})(AddDogInfo);