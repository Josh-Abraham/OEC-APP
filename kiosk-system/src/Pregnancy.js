// Import Functions for Base Home App
import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import Proptypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

class Pregnancy extends Component {
    // Creating State Constructor for Preg Page
    constructor(props) {
      super(props);
      this.state = {
        type: 'Pregnancy',
        hospitalName: 'Welcome to Hamilton General Hospital'
      }
    }


    buttonHit() {
      const frequenciesRadio =  document.getElementsByName('contractionFrequency');
      let radioValue = '';
      let i = 0;
      let length = 0;
      for (i = 0, length = frequenciesRadio.length; i < length; i++)
      {
       if (frequenciesRadio[i].checked)
       {
         radioValue = (frequenciesRadio[i]).id;
       }
     }
     const durationRadio =  document.getElementsByName('contractionDuration');
     let durationValue = '';
     for (i = 0, length = durationRadio.length; i < length; i++)
     {
      if (durationRadio[i].checked)
      {
        durationValue = (durationRadio[i]).id;
      }
    }
    const name = document.getElementById('fullName').value;
    const number = document.getElementById('phoneNumber').value;
    const data = {
      type: this.state.type,
      waterBroken: document.getElementById('myCheck').checked,
      frequency: radioValue,
      duration: durationValue,
      fullName: name,
      number: '+1'+number,
      priority: '',
      arrivalTime: '',
      SideEffects: ['']
    }
      axios.post('http://localhost:5000/save', data)
         .then(res => {
           console.log(res);
           console.log(res.data);
           this.props.onChange('Main')
         });
    }

    render() {
      return (
        <div>
          <h1>
            <Badge color="info" pill className="centreHeader">{this.state.hospitalName}</Badge>
          </h1>
          <div className="flowCol">
            <legend>Full Name</legend>
            <p>
              <input type = "text"
              id = "fullName"
              placeholder = "Full Name" />
            </p>
            <legend>Phone Number</legend>
            <p>
              <input type = "text"
              id = "phoneNumber"
              placeholder = "Phone Number" />
            </p>
            <h2>
              <div className="textHeader"> Has your water broken?</div>
            </h2>
            <input type="checkbox" id="myCheck"/>
            <h2>
              <div className="textHeader"> How frequent are your contractions</div>
            </h2>
             <input type="radio" name="contractionFrequency" id="5-30"/>
             <label for="5-30">5 - 30 Minutues Apart</label>
             <input type="radio" name="contractionFrequency" id="3-5"/>
             <label for="5-30">3 - 5 Minutues Apart</label>
             <input type="radio" name="contractionFrequency" id="30-2"/>
             <label for="5-30">30 Seconds - 2 Minutues Apart</label>

             <h2>
               <div className="textHeader"> How long do your contractions last?</div>
             </h2>
              <input type="radio" name="contractionDuration" id="30-45"/>
              <label for="5-30">30 - 45 Seconds Long</label>
              <input type="radio" name="contractionDuration" id="45-60"/>
              <label for="5-30">45 - 60 Seconds Long</label>
              <input type="radio" name="contractionDuration" id="60-90"/>
              <label for="5-30">60 - 90 Seconds Long</label>
            <Button onClick={this.buttonHit.bind(this)}> Save </Button>
          </div>
          </div>
      );
    }
}

Pregnancy.proptypes = {
  onChange: Proptypes.func.isRequired,
}

export default Pregnancy;
