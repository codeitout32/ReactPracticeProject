import React, { useState, useRef, useEffect } from "react";
import { FormControl } from "react-bootstrap";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { strUpdate } from "../../actions/loginActions";
import { useMatch, useLocation, Link } from "react-router-dom";

const Profile = (props) => {
  const [username, setusername] = useState("");
  const uname = useRef("new");
  const umail = useRef("new");
  //Redux
  const strData = useSelector((user) => user);
  const qckDispatch = useDispatch();

  //router
  console.log("props:", props);

  // const match = useMatch();
  // const location = useLocation();

  // console.log("match", match);
  // console.log(location);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputMail = umail.current.value;
    const inputUser = uname.current.value;
    if (
      // strData.session.userData.account.email === inputMail ||
      inputMail.length < 4
    )
      return;
    if (
      // strData.session.userData.account.username === inputUser ||
      inputUser.length < 4
    )
      return;
    const id = strData.session.userData.account.id;
    console.log("submitted");
    const user = { username: inputUser, email: inputMail, id };

    qckDispatch(strUpdate(user));
  };
  return (
    <div>
      <h1>Profile</h1>
      <Container>
        <Link to="/"> Go Back </Link>
        <Row>
          <Col></Col>
          <Col md={6} xs={8} className="align-self-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Email address: {strData.session.userData.account.email}
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="New email"
                  ref={umail}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Username: {strData.session.userData.account.username}
                </Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Username"
                  ref={uname}
                  onChange={() => console.log(uname.current.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
