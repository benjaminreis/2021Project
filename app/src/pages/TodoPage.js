import React, { useState, useEffect } from "react";
// import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import { fetchTodos } from "../services/TodoServices";
import TodoTable from "../components/TodoTable";
import Modal from "react-bootstrap/Modal";
import AddTodoModal from "../components/AddTodoModal";
import { Col, Container, Row, DropdownButton, Dropdown } from "react-bootstrap";

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
    <Container>
      <Row className="mb-3">
        <div className="ml-2">
          <DropdownButton id="dropdown-basic-button" title="Filter Todos">
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Completed</Dropdown.Item>
            <Dropdown.Item>Incomple</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="ml-3">
          <Button onClick={toggleShowAddModal}> Add ToDo</Button>
        </div>
      </Row>
      {/* {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>test test </Toast.Body>
      </Toast> */}
      <Row>
        <TodoTable />
      </Row>

      <Modal show={showAddModal}>
        <AddTodoModal toggleShowAddModal={toggleShowAddModal} />
      </Modal>
    </Container>
  );
};

export default TodoPage;
