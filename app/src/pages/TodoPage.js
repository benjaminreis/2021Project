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
  const [todoFilterLabel, setTodoFilterLabel] = useState("Filter Todos");
  const [todoFilterVal, setTodoFilterVal] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleShowAddModal = () => {
    let newVal = !showAddModal;
    setAddModal(newVal);
  };

  return (
    <Container>
      <Row className="mb-3">
        <div className="ml-2">
          <DropdownButton
            id="dropdown-basic-button"
            title={todoFilterLabel}
            onSelect={(val) => {
              setTodoFilterLabel(`${val[0].toUpperCase()}${val.slice(1)}`);
              setTodoFilterVal(val);
            }}
          >
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
            <Dropdown.Item eventKey="incomplete">Incomplete</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="ml-3">
          <Button onClick={toggleShowAddModal}> Add ToDo</Button>
        </div>
      </Row>
      <Row>
        <TodoTable tableFilter={todoFilterVal} />
      </Row>

      <Modal show={showAddModal}>
        <AddTodoModal toggleShowAddModal={toggleShowAddModal} />
      </Modal>
    </Container>
  );
};

export default TodoPage;
