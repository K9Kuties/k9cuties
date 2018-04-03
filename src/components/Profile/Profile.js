import React, {Component} from 'react'
import './Profile.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { getUser, getDog } from './../../ducks/users';


class Profile extends Component {
    constructor () {
        super()
        this.state = {
            mainPicture: '',
            name: '',
            age: ''
        }
    }
    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                this.setState({
                    mainPicture: res.data[0].img1,
                    name: res.data[0].name,
                    age: res.data[0].age

                })
            })
        })
    }
  render(){
      return(
          <div className='profDiv'>
            <div className='profileHeader'>
            <a href='/#/settings'><button className='profileSettingsBut'>Settings</button></a>
            <p className='profileProfile'>Profile</p>
            <a href='/#/matches'><button className='profileMessagesBut'>Messages</button></a>
            </div>
            <div className='profilePicContainer'>
                <img src={this.state.mainPicture} className='profilePic'/>
            </div>    
            <div className='nameAndAge'>{this.state.name}, {this.state.age}</div>
            <div className='profileButts'>
                <button className='editBut'>Edit Profile</button>
                <button className='settingsBut'>Settings</button>
            </div>
            <button className='logBut'>Log out</button>

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