// Import Functions for Base Home App
import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import Proptypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import axios from 'axios';

class Pregnancy extends Component {
    // Creating State Constructor for Preg Page
    constructor(props) {
      super(props);
      this.state = {
        type: 'Pregnancy',
        hospitalName: 'Welcome to Hamilton General Hospital',
        FullName: '',
        PhoneNumber: '0000000000',
        waterBroke: false,
        contractionFrequency: '',
        contractionDuration: ''
      }
    }


    buttonHit() {
      console.log(this.state);
    const data = {
      type: this.state.type,
      waterBroken: this.state.waterBroke,
      frequency: this.state.contractionFrequency,
      duration: this.state.contractionDuration,
      fullName: this.state.FullName,
      number: '+1'+this.state.PhoneNumber,
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

    pageTitle() {
      return (
        <div className="center">
        <div className="jumbotron">
          <h1 className="display-4" style={{ "textAlign": "center" }}>{this.state.hospitalName}</h1>
        </div>
        </div>
      );
    }


    createTextField(label) {
      const id = label.replace(/\s/g, '');

      return (
        <div className="textFieldBlur">
            <legend>{`${label}:`}</legend>
          <p>
           <input type = "text"
             id = {id}
             placeholder = "Enter Here"
             className="textFieldInput"
             onBlur={this.getTextFieldInput.bind(this, id)}
             />
          </p>
        </div>
      );
    }

    getTextFieldInput(label) {
      console.log(label);
     const input = document.getElementById(label);
      if ( input !== null ) {
        console.log(this.state[label])
        this.setState({ [label]: input.value });
      }
    }


    // ______________________________________________________________________________________________________________
    // CHECK BOX MAKER

    checkBoxMaker(inputField, title ,label) {
      return (
      <div className="styleBetween">
      <h2>
        <div className="textHeader">{title}</div>
      </h2>
        <div className="form-check">
          <input class="form-check-input" className="styleCheckBox" type="checkbox" value="" id="check1" onClick={this.checkClick.bind(this, inputField)}/>
          <label className="form-check-label" for="defaultCheck1">
            {label}
          </label>
        </div>
      </div>
      );
    }

    // ______________________________________________________________________________________________________________________________
    // Check Box Action Handler

    checkClick(inputField) {
      this.setState({ [inputField]: !this.state[inputField]});
    }


    //______________________________________________________________________________________________________________________________
    //RADIO BUTTON GROUP

    radioGroupMaker(elements,title, group) {
      const groupButtons = elements.map((element) => {
          return (
            <div>
              <input
                type="radio"
                name={group}
                id={element.id}
                className="radioGroupElement"
                onClick={this.radioButtonHit.bind(this, group, element.id)}
              />
              <label for={element.id}>{element.label}</label>
            </div>
          );
      });
      return (
        <div className="radioGroupColumn">
        <h2>
          <div className="textHeader">{title}</div>
        </h2>
          {groupButtons}
        </div>
      )
    }

    //______________________________________________________________________________________________________________________________
    //Radio button Handler

    radioButtonHit(group, buttonHit) {
      this.setState({ [group]: buttonHit });
    }


    render() {
      const title = this.pageTitle();
      const fullName = this.createTextField('Full Name');
      const phoneNumber = this.createTextField('Phone Number');
      const waterBroke = this.checkBoxMaker('waterBroke', 'Has your water broken?','Yes or No');
      const frequencyContent = [
        {
          id: '5-30',
          label: '5 - 30 Minutues Apart'
        },
        {
          id: '3-5',
          label: '3 - 5 Minutues Apart'
        },
        {
          id: '30-2',
          label: '30 Seconds - 2 Minutues Apart'
        }
      ];
      const frequencyGroup = this.radioGroupMaker(frequencyContent,  'How frequent are your contractions?', 'contractionFrequency');

      const durationContent = [
        {
          id: '30-45',
          label: '30 - 45 Seconds Long'
        },
        {
          id: '45-60',
          label: '45 - 60 Seconds Long'
        },
        {
          id: '60-90',
          label: '60 - 90 Seconds Long'
        }
      ];
      const durationGroup = this.radioGroupMaker(durationContent,  'How long do your contractions last?', 'contractionDuration');

      return (
        <div>
          {title}
          <div className="flowCol">
            {fullName}
            {phoneNumber}
            {waterBroke}
            {frequencyGroup}
            {durationGroup}
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
