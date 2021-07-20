import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import { createNewUser } from "../services/UsersService";

const CreateUserModal = ({ toggleShowCreateUserModal }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [showCreateUserModal, setCreateUserModal] = useState(false);

  useEffect(() => {}, []);

  const addUser = () => {
    let errors = [];
    if (!firstName) {
      errors.push("First Name Required");
    }
    if (!lastName) {
      errors.push("Last Name Required");
    }
    if (!userName) {
      errors.push("Username Required");
    }
    if (!email) {
      errors.push("Email Required");
    }
    if (!password) {
      errors.push("Password Required");
    }
    if (!confirmPassword) {
      errors.push("Confirm Password Required");
    }
    if (password != confirmPassword) {
      errors.push("Passwords do not match");
    }

    //TODO BEN possibly check password requirements (regex)
    //TODO BEN check email with regex

    setErrorMessages(errors);
    let newUser = {};
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.userName = userName;
    newUser.email = email;
    newUser.password = password;
    createNewUser(newUser).then((result) => {
      console.log(result);
    })
    // newTodoItem.name = name;
    // addTodo(newTodoItem).then(toggleShowCreateUserModal());
  };

  return (
    <>
      <Modal.Header>Create a New User</Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            First Name:
          </InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Last Name:
          </InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Username:
          </InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            email:
          </InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Password
          </InputGroup.Text>
          <FormControl
            type="password"
            aria-label="password"
            aria-describedby="inputGroup-sizing-default"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Confirm Password
          </InputGroup.Text>
          <FormControl
            type="password"
            aria-label="password"
            aria-describedby="inputGroup-sizing-default"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>

        {errorMessages?.length > 0 && (
          <ul>
            {errorMessages.map((line) => {
              return <li style={{ color: "red" }}>{line}</li>;
            })}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button class="btn btn-primary" onClick={toggleShowCreateUserModal}>
          Cancel
        </Button>
        <Button class="btn btn-success" onClick={addUser}>
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default CreateUserModal;
