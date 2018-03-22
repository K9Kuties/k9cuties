import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Photos from './photos'
import './photos.css'
import Photospage from './components/photospage/photospage'
import Profile from './components/Profile/Profile'
import Message from './components/Message/Message'
import Login from './components/Login/Login';
import AddDogInfo from './components/AddDogInfo/AddDogInfo';
import Swiping from './components/Swiping/Swiping';
import UploadImage from './components/UploadImage/UploadImage';
import Matches from './components/Matches/Matches';
import Settings from './components/Settings/Settings';



import EditInfo from './components/EditInfo/EditInfo'


class App extends Component {
  render() {
    return (
      <div className="App">
        
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/adddoginfo' component={AddDogInfo} />
            <Route path='/photos' component={Photos}/>
            <Route path='/photospage' component={Photospage}/>
            <Route path='/swiping' component={Swiping} />
            <Route path='/uploadimage' component={UploadImage} />
            <Route path='/matches' component={Matches} />
            <Route path='/settings' component={Settings} />
            <Route path='/message/:userOne/:userTwo' component={Message} />
            <Route path='/profile' component={Profile}/>
            <Route path='/editinfo' component={EditInfo}/>
          </Switch>
       
      </div>
    )
  }
}

export default App;