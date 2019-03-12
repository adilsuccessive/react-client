import axios from 'axios';

const callApi = async (data, method, path) => {
  try {
    const response = await axios({
      method,
      url: `https://express-training.herokuapp.com/api/${path}`,
      data,
      headers: { Authorization: localStorage.getItem('token') },
    });
    return (response);
  } catch (err) {
    return (err);
  }
};

export default callApi;
