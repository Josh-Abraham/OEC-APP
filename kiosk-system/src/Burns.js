// Import Functions for Base Home App
import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import Proptypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import axios from 'axios';

class Burns extends Component {
    // Creating State Constructor for Preg Page
    constructor(props) {
      super(props);
      this.state = {
        type: 'Burns',
        hospitalName: 'Welcome to Hamilton General Hospital',
        FullName: '',
        PhoneNumber: '',
        swelling: false,
        blistering: false,
        peeling: false,
        skinColor: '',
        weakness: false,
        pale: false,
        lips: false,
        showWarning: false
      }
    }


    buttonHit() {
    if (this.state.PhoneNumber.length === 10 && this.state.FullName !== '') {
      const data = {
        type: this.state.type,
        swelling: this.state.swelling,
        blistering: this.state.blistering,
        peeling: this.state.peeling,
        skinColor: this.state.skinColor,
        weakness: this.state.weakness,
        pale: this.state.pale,
        lips: this.state.lips,
        fullName: this.state.FullName,
        number: '+1'+this.state.PhoneNumber,
        priority: '',
        arrivalTime: ''
      }
        axios.post('http://localhost:5000/save', data)
           .then(res => {
             this.setState({ showWarning : false });
             this.props.onChange('Main')
           });
      } else {
        this.setState({ showWarning : true });
      }
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
     const input = document.getElementById(label);
      if ( input !== null ) {
        this.setState({ [label]: input.value });
      }
    }


    // ______________________________________________________________________________________________________________
    // CHECK BOX MAKER

    checkBoxMaker(inputField, title ,label) {
      let titleElement = null;
      if (title !== '') {
        titleElement = (
          <h2>
            <div className="textHeader">{title}</div>
          </h2>
        );
      }
      return (
      <div>
        {titleElement}
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
      const swelling = this.checkBoxMaker('swelling', 'Is the burn area swelling?','Yes or No');
      const blistering = this.checkBoxMaker('blistering', 'Is the burn area blistering?','Yes or No');
      const peeling = this.checkBoxMaker('peeling', 'Is the burn area peeling?','Yes or No');
      const skinColor = [
        {
          id: 'pinkRed',
          label: 'Dark Pink - Light Red'
        },
        {
          id: 'darkRed',
          label: 'Dark Red - Purple'
        },
        {
          id: 'black',
          label: 'Blackened or charred'
        },
        {
          id: 'white',
          label: 'White'
        }
      ];
      const colourGroup = this.radioGroupMaker(skinColor,  'What color is your skin where burnt', 'skinColor');

      const symptomContent = [
        {
          id: 'weakness',
          title: 'Are you Experiencing any other symptoms (check all that apply)?',
          label: 'Weakness'
        },
        {
          id: 'pale',
          title: '',
          label: 'Pale or Clammy Skin'
        },
        {
          id: 'lips',
          title: '',
          label: 'Bluish Lips or Fingernails'
        }
      ]
      const symptomButtons = symptomContent.map((element) => this.checkBoxMaker(element.id, element.title, element.label));

      const warningBanner = this.state.showWarning ?
        <button type="button" class="btn btn-lg btn-outline-danger warningBanner" disabled>
        WARNING - You must submit an non-empty name and a 10-digit phone number </button> : null;

      return (
        <div>
          {title}
          <div className="flowCol">
            {warningBanner}
            {fullName}
            {phoneNumber}
            {swelling}
            {blistering}
            {peeling}
            {colourGroup}
            {symptomButtons}
            <Button className="styleBetween" onClick={this.buttonHit.bind(this)}> Submit Information </Button>
          </div>
          </div>
      );
    }
}

Burns.proptypes = {
  onChange: Proptypes.func.isRequired,
}

export default Burns;
