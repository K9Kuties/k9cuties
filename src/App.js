import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Photos from './photos'
import './photos.css'

import Login from './components/Login/Login';
import AddDogInfo from './components/AddDogInfo/AddDogInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/adddoginfo' component={AddDogInfo} />
            <Route path='/photos' component={Photo}/>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;
