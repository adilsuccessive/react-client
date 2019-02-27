import { Component } from 'react';
import PropTypes from 'prop-types';

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    getResult = (first, second, operator) => {
      let results;
      switch (operator) {
      case '+':
        results = first + second;
        break;
      case '-':
        results = first - second;
        break;
      case '*':
        results = first * second;
        break;
      case '/':
        results = second === 0 ? 'Infinity' : first / second;
        break;
      default:
        results = 'Invalid Operation';
      }
      return (results);
    }

    render() {
      const {
        first,
        second,
        operator,
        children,
      } = this.props;
      const result = this.getResult(first, second, operator);
      const dataToShow = children
        ? children({
          first, second, operator, result,
        }) : `${first}  ${operator}  ${second} =  ${result}`;
      return (dataToShow);
    }
}

Math.defaultProps = {
  children: null,
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

export default Math;
