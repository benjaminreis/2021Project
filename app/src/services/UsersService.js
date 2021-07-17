import Axios from "axios";

const rootURL = "https://localhost:5001/Users/";

// https://localhost:5001/Users/authenticate

const authenticateUser = async (model) => {
  try {
    console.log(model);
    const response = await Axios.post(`${rootURL}authenticate`, model);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { authenticateUser };
