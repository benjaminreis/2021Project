import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import { addTodo } from "../services/TodoServices";

const AddTodoModal = ({ children, toggleShowAddModal }) => {
  const [name, setName] = useState("");

  useEffect(() => {}, []);

  const addItem = () => {
    let newTodoItem = {};
    newTodoItem.name = name;
    addTodo(newTodoItem).then(toggleShowAddModal());
  };

  return (
    <>
      <Modal.Header>Add a new Todo</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Todo Name:
          </InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button class="btn btn-primary" onClick={toggleShowAddModal}>
          Cancel
        </Button>
        <Button class="btn btn-success" onClick={addItem}>
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddTodoModal;
