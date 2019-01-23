// Import Functions for Base Home App
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainScreen from './MainScreen.js';
import Pregnancy from './Pregnancy.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Main'
    };
  }

  onChange(newState) {
    console.log(newState);
    this.setState({ view: newState });
  }

  render() {
    const view = this.state.view === 'Main' ? <MainScreen view={this.state.view} onChange={this.onChange.bind(this)}/> : null;
    const view2 = this.state.view === 'Pregnancy' ? <Pregnancy view={this.state.view} onChange={this.onChange.bind(this)}/> : null;
    return (
      <div>
        {view}
        {view2}
      </div>
    );
  }
}

export default App;
