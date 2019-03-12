import axios from 'axios';

const callApi = async (data, method, path) => {
  try {
    const response = await axios({
      method,
      url: `https://express-training.herokuapp.com/api/${path}`,
      data,
    });
    return (response.data);
  } catch (err) {
    return (err);
  }
};

export default callApi;
