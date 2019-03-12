import axios from 'axios';

const callApi = async (email, password, path) => {
  try {
    const response = await axios({
      method: 'post',
      url: `https://express-training.herokuapp.com/api/${path}`,
      data: {
        email,
        password,
      },
    });
    return (response.data);
  } catch (err) {
    return (err);
  }
};

export default callApi;
