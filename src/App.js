import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import AddDogInfo from './components/AddDogInfo/AddDogInfo';
import Swiping from './components/Swiping/Swiping';
import UploadImage from './components/UploadImage/UploadImage';
import Matches from './components/Matches/Matches';
import Settings from './components/Settings/Settings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/adddoginfo' component={AddDogInfo} />
            <Route path='/swiping' component={Swiping} />
            <Route path='/uploadimage' component={UploadImage} />
            <Route path='/matches' component={Matches} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;