import Axios from "axios";

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
// export default fetchTodos;

const addTodo = async (model) => {
  try {
    console.log(model);
    const response = await Axios.post(rootURL, model);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// export default addTodo;
export { fetchTodos, addTodo };
