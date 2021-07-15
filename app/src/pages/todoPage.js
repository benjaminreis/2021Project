import React, { useState, useEffect } from "react";
// import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import { fetchTodos } from "../services/TodoServices";
import TodoTable from "../components/TodoTable";
import Modal from "react-bootstrap/Modal";
import AddTodoModal from "../components/AddTodoModal";

const TodoPage = ({ children }) => {
  // const [show, toggleShow] = useState(false);
  const [showAddModal, setAddModal] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleShowAddModal = () => {
    console.log("modal toggled");
    console.log(showAddModal);
    let newVal = !showAddModal;
    setAddModal(newVal);
  };

  return (
    <>
      <Button onClick={toggleShowAddModal}> Add ToDo</Button>
      {/* {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>test test </Toast.Body>
      </Toast> */}
      <TodoTable />

      <Modal show={showAddModal}>
        <AddTodoModal toggleShowAddModal={toggleShowAddModal} />
      </Modal>
    </>
  );
};

export default TodoPage;
