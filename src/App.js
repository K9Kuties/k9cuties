import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Photos from './photos'
import './photos.css'
import Photospage from './components/photospage/photospage'

import Login from './components/Login/Login';
import AddDogInfo from './components/AddDogInfo/AddDogInfo';
import Swiping from './components/Swiping/Swiping';
import UploadImage from './components/UploadImage/UploadImage';
import Message from './components/Message/Message.js';

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
            <Route path='/message/:userOne/:userTwo' component={Message} />
          </Switch>
       
      </div>
    )
  }
}

export default App;