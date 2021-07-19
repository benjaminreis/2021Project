import Axios from "axios";
//TODO BEN
//https://github.com/cornflourblue/react-jwt-authentication-example

const rootURL = "https://localhost:5001/api/TodoItems/";

const fetchTodos = async () => {
  try {
    const response = await Axios.get(rootURL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const addTodo = async (model) => {
  try {
    console.log(model);
    const response = await Axios.post(rootURL, model);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const editTodo = async (id, model) => {
  try {
    const response = await Axios.put(`${rootURL}${id}`, model);
    return response.data;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export { fetchTodos, addTodo, editTodo };
