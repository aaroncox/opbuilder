import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndexContainer from './containers/index'
import './semantic/dist/semantic.min.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/opbuilder" component={IndexContainer}/>
          <Route path="/opbuilder/sign/tx/:ops" component={IndexContainer}/>
        </div>
      </Router>
    )
  }
}
