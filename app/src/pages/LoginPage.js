import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Col, Row, InputGroup, FormControl } from "react-bootstrap";
import { authenticateUser } from "../services/UsersService";

const LoginPage = ({ children }) => {
  // const [show, toggleShow] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {}, []);

  return (
    <Container>
      <Col md={{ span: 3, offset: 3 }}>
        <Row>
          345= <h4>login:asdf</h4>
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
          <Col md={{ span: 3, offset: 9 }}>
            <Button
              class="btn btn-success"
              onClick={() => {
                let user = {};
                user.Username = username;
                user.Password = password;
                authenticateUser(user);
              }}
            >
              login
            </Button>
          </Col>{" "}
        </Row>
      </Col>
    </Container>
  );
};

export default LoginPage;
