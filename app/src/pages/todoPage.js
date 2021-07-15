import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import { fetchTodos } from "../services/TodoServices";
import TodoTable from "../components/TodoTable";

const TodoPage = ({ children }) => {
  const [show, toggleShow] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {/* {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>test test </Toast.Body>
      </Toast> */}
      <TodoTable />
    </>
  );
};

export default TodoPage;
