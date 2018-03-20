import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Photos from './photos'
import './photos.css'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/photos' component={Photos}/>
      </Switch>
      </div>
    );
  }
}

export default App;
