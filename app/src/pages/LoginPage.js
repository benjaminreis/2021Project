import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Col, Row, InputGroup, FormControl } from "react-bootstrap";
import { authenticateUser } from "../services/UsersService";
import { useLocation, useHistory } from "react-router-dom";
import CreateUserModal from "../components/CreateUserModal";
import Modal from "react-bootstrap/Modal";

const LoginPage = ({ children, setUser }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [showCreateUserModal, setCreateUserModal] = useState(false);

  const { state } = useLocation();
  let history = useHistory();

  useEffect(() => {}, []);

  const login = async () => {
    let user = {};
    user.Username = username;
    user.Password = password;
    let userResult = await authenticateUser(user);
    if (userResult?.token) {
      setRedirectToReferrer(true);
      setUser(userResult);
    }
  };
  useEffect(() => {
    if (redirectToReferrer === true) {
      history.replace(state?.from.pathname || "/");
    }
  }, [redirectToReferrer]);

  const toggleShowCreateUserModal = () => {
    let newVal = !showCreateUserModal;
    setCreateUserModal(newVal);
  };

  return (
    <Container>
      <Col md={{ span: 3, offset: 3 }}>
        <Row>
          <h5 className="ml-2">login:</h5>
        </Row>
        <Row>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              username
            </InputGroup.Text>
            <FormControl
              aria-label="username"
              aria-describedby="inputGroup-sizing-default"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              password
            </InputGroup.Text>
            <FormControl
              type="password"
              aria-label="password"
              aria-describedby="inputGroup-sizing-default"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 0}}>
            <Button
              class="btn btn-success"
              onClick={() => {
                toggleShowCreateUserModal();
              }}
            >
              create new user
            </Button>
          </Col>
          <Col md={{ span: 3, offset: 1 }}>
            <Button
              class="btn btn-success"
              onClick={() => {
                login();
              }}
            >
              login
            </Button>
          </Col>
        </Row>
        <Row></Row>
      </Col>
      <Modal show={showCreateUserModal}>
        <CreateUserModal
          toggleShowCreateUserModal={toggleShowCreateUserModal}
        />
      </Modal>
    </Container>
  );
};

export default LoginPage;
