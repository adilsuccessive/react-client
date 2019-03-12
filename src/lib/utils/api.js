import axios from 'axios';

const callApi = async (email, password) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://express-training.herokuapp.com/api/user/login',
      data: {
        email,
        password,
      },
    });
    return (response.data);
  } catch (err) {
    console.log(err,"insideapi")
    return (err);
  }
};

export default callApi;
