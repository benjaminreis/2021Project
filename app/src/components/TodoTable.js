import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import Toast from "react-bootstrap/Toast";
// import Button from "react-bootstrap/Button";
import { fetchTodos } from "../services/TodoServices";


//[{id: 1, name: "test ben", isComplete: false},
const columns = [
  {
    dataField: "id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "name",
    text: "Name of TODO",
  },
  {
    dataField: "isComplete",
    text: "Is Complete",
  },
];

const TodoTable = ({ children }) => {
  const [items, setItems] = useState();

  const loadData = async () => {
    const todoData = await fetchTodos();
    console.log(todoData);
    setItems(todoData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>{items != null && <BootstrapTable keyField={'id'} columns={columns} data={items} />}</>
  );
};

export default TodoTable;
