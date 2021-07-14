import Axios from "axios";

const fetchTodos = async () => {
  const response = await Axios("https://localhost:5001/api/TodoItems/");
  console.log(response.data);
  return response.data;
};
export default fetchTodos;
