import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  SPORTS,
  CRICKETOPTIONS,
  FOOTBALLOPTIONS,
  CRICKET,
  FOOTBALL,
} from '../../configs/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSportsChange = (event) => {
    this.setState({
      sport: event.target.value,
      cricket: '',
      football: '',
    });
  }

  handlePositionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === CRICKET) ? event.target.value : '',
      football: (sport === FOOTBALL) ? event.target.value : '',
    });
  }

  renderCricket = () => {
    const { sport, cricket } = this.state;

    if (sport !== CRICKET) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup value={cricket} options={CRICKETOPTIONS} onChange={this.handlePositionChange} />
      </div>
    );
  }

  renderFootball = () => {
    const { sport, football } = this.state;

    if (sport !== FOOTBALL) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup
          value={football}
          options={FOOTBALLOPTIONS}
          onChange={this.handlePositionChange}
        />
      </div>
    );
  }

  render() {
    const { value, sport } = this.state;
    console.log(this.state);
    return (
      <>
        <h3>Name</h3>
        <TextField value={value} onChange={this.handleNameChange} />
        <h3>Select the game you play?</h3>
        <SelectField value={sport} onChange={this.handleSportsChange} options={SPORTS} />
        {this.renderCricket()}
        {this.renderFootball()}
      </>

    );
  }
}
export default InputDemo;
