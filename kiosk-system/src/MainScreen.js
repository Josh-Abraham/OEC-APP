// Import Functions for Base Home App
import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import Proptypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class MainScreen extends Component {
    // Creating State Constructor for Main Page
    constructor(props) {
      super(props);
      this.state = {
        hospitalName: 'Welcome to Hamilton General Hospital'
      }
    }

    pregnancyButton() {
      this.props.onChange('Pregnancy')
    }

    burnsButton() {
      console.log('hit');
      this.props.onChange('Burns')
    }

    render() {
      return (
        <div>
          <h1>
            <Badge color="info" pill className="centreHeader">{this.state.hospitalName}</Badge>
          </h1>
          <h2>
            <div className="textHeader"> Please pick one of the following options:</div>
          </h2>
          <Button color="info" size="lg" className="mainButtons" outline onClick={this.pregnancyButton.bind(this)}>Pregnancy</Button>
          <Button color="warning" size="lg" className="mainButtons" outline onClick={this.burnsButton.bind(this)}>Burn</Button>
          </div>
      );
    }
}

MainScreen.proptypes = {
  onChange: Proptypes.func.isRequired,
}

export default MainScreen;
