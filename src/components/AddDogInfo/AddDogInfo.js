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
                <h2>Add Dog Info</h2>
                <h5>Dogs Name: <input type='text'/></h5>
                <h5>Breed: <input type='text'/></h5>
                <h5>Age: <select>
                    <option></option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                </select></h5>
                <h5>Sex: <select>
                    <option></option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select></h5>
                <button>Next</button>
                
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



{/* <a href='http://localhost:3005/logout'><button>Logout</button></a> */}