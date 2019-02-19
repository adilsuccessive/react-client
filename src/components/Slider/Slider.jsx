import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/math';

const propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arr,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
const defaultProps = {
  altText: 'DefaultBanner',
  banners: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const { random, duration } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      if (random) {
        this.setState({ index: getRandomNumber(6) });
        return;
      }
      const value = getNextRoundRobin(6, index);
      this.setState({
        index: value,
      });
    }, duration);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const {
      altText,
      banners,
      defaultBanner,
      duration,
      height,
      random,
      ...rest
    } = this.props;
    const { index } = this.state;
    console.log(index);
    const source = (banners) ? banners[index] : defaultBanner;
    console.log(source);
    return (
      <>
        <img src={source} {...rest} alt={altText} height={height} />
      </>
    );
  }
}
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
export default Slider;
