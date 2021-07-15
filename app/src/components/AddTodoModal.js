import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { InputGroup, FormControl } from "react-bootstrap";

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
      <Modal.Header>Hi</Modal.Header>
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
        <button onClick={toggleShowAddModal}>Cancel</button>
        <button onClick={addItem}>Save</button>
      </Modal.Footer>
    </>
  );
};

export default AddTodoModal;
