import React from 'react';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';
import { TextField, Slider } from '../../components';

const Banners = [
  `${PUBLIC_IMAGE_FOLDER}default.png`,
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,

];
const TextFieldDemo = () => (
  <div>
    <div style={{ textAlign: 'center' }}>
      <Slider banners={Banners} />
    </div>
    <h4>This is a disabled input</h4>
    <TextField placeholder="Disabled Input" disabled />
    <h4>A Valid Input</h4>
    <TextField value="Accessible" />
    <h4>An Input with errors</h4>
    <TextField value="101" error="Could not be greater than" />
  </div>
);

export default TextFieldDemo;
