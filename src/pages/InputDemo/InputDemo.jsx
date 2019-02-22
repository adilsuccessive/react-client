import React, { Component } from 'react';
import * as yup from 'yup';
import style from './style';
import {
  TextField,
  SelectField,
  RadioGroup,
  Button,
} from '../../components';
import {
  SPORTS,
  CRICKETOPTIONS,
  FOOTBALLOPTIONS,
  CRICKET,
  FOOTBALL,
} from '../../configs/constants';

const schema = yup.object({
  value: yup.string().min(3).required().label('Name'),
  sport: yup.string().min(3).required().label('Sport'),
  football: yup.string().label('What you do').when('sport', {
    is: val => val === 'Football',
    then: yup.string().required(),
  }),
  cricket: yup.string().label('What you do').when('sport', {
    is: val => val === 'Cricket',
    then: yup.string().required(),
  }),
});

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      touch: {},
      value: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleBlur = field => () => {
    const { touch } = this.state;
    touch[field] = true;

    this.setState({
      touch,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const parsedErrors = {};
    const {
      value,
      sport,
      football,
      cricket,
    } = this.state;

    schema.validate({
      value,
      sport,
      football,
      cricket,
    }, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: parsedErrors,
        });
      })
      .catch((errors) => {
        errors.inner.forEach((error) => {
          parsedErrors[error.path] = error.message;
        });
        this.setState({
          errors: parsedErrors,
        });
      });
  }

  getError = (field) => {
    const { errors, touch } = this.state;

    if (!touch[field]) {
      return null;
    }

    return errors[field] || '';
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touch } = this.state;
    return Object.keys(touch).length !== 0;
  }

  handleNameChange = (event) => {
    this.setState({
      value: event.target.value,
    }, () => this.handleValidate());
  }

  handleSportsChange = (event) => {
    this.setState({
      sport: event.target.value,
      cricket: '',
      football: '',
    }, () => this.handleValidate());
  }

  handlePositionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === CRICKET) ? event.target.value : '',
      football: (sport === FOOTBALL) ? event.target.value : '',
    }, () => this.handleValidate());
  }

  renderCricket = () => {
    const { sport, cricket } = this.state;

    if (sport !== CRICKET) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup
          value={cricket}
          options={CRICKETOPTIONS}
          onChange={this.handlePositionChange}
          onBlur={this.handleBlur('cricket')}
          error={this.getError('cricket')}
        />
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
          onBlur={this.handleBlur('football')}
          error={this.getError('football')}
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
        <TextField
          value={value}
          onChange={this.handleNameChange}
          onBlur={this.handleBlur('value')}
          error={this.getError('value')}
        />
        <h3>Select the game you play?</h3>
        <SelectField
          value={sport}
          onChange={this.handleSportsChange}
          options={SPORTS}
          onBlur={this.handleBlur('sport')}
          error={this.getError('sport')}
        />
        {this.renderCricket()}
        {this.renderFootball()}
        <div style={style.base}>
          <Button value="Cancel" onClick={() => {}} />
          <Button
            value="Submit"
            color="primary"
            disabled={this.hasErrors() || !this.isTouched()}
            style={style.active}
          />
        </div>
      </>

    );
  }
}
export default InputDemo;
