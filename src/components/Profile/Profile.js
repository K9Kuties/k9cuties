import React, {Component} from 'react'
import './Profile.css'

export default class Profile extends Component {
  render(){
      return(
          <div className='profDiv'>
              <div className='profilePic'>UR PICTURE HERE</div>
              <div className='nameAndAge'>AXEL, 42</div>
              <div>
                <button className='settingsBut'>Settings</button>
                <button className='editBut'>Edit</button>
              </div>
              <button className='logBut'>Logout</button>

          </div>
      )
  }
}