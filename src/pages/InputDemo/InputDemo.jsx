import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import { SPORTS, CRICKETOPTIONS, FOOTBALLOPTIONS, CRICKET, FOOTBALL } from '../../configs/constants';


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
      sport: event.nativeEvent.target.value,
    });
  }

  handlePositionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === CRICKET) ? event.nativeEvent.target.value : '',
      football: (sport === FOOTBALL) ? event.nativeEvent.target.value : '',
    });
  }

  render() {
    const { value, sport } = this.state;
    const radio = (sport === CRICKET) ? CRICKETOPTIONS : FOOTBALLOPTIONS;
    console.log(this.state);
    return (
      <>
        <h3>Name</h3>
        <TextField value={value} onChange={this.handleNameChange} />
        <h3>Select the game you play?</h3>
        { <SelectField value={sport} onChange={this.handleSportsChange} options={SPORTS} /> }
        { sport
          ? (
            <div>
              <h4>What you do?</h4>
              {/* <RadioGroup value="male" options={radio} onchange={this.handlePositionChange} /> */}
            </div>
          )
          : '' }
      </>
    );
  }
}
export default InputDemo;
