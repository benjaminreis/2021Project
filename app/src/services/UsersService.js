import Axios from "axios";

const rootURL = "https://localhost:5001/Users/";

// https://localhost:5001/Users/authenticate

const authenticateUser = async (model) => {
  try {
    const response = await Axios.post(`${rootURL}authenticate`, model);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createNewUser = async (model) => {
  try {
    const response = await Axios.post(`${rootURL}createUser`, model);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export { authenticateUser, createNewUser };
