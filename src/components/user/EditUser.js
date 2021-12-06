import React, { useState, useRef, useEffect } from "react";
import { FormControl } from "react-bootstrap";

import { Container, Form, Button, Row, Col } from "react-bootstrap";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { strUpdate, updateList } from "../../actions/loginActions";
import {
  useMatch,
  useLocation,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { fetchLists } from "../../actions/listActions";

const EditUser = () => {
  const uname = useRef("");

  const umail = useRef("new");

  console.log("uname", uname);

  //Redux
  const strData = useSelector((user) => user);
  const qckDispatch = useDispatch();

  //router
  let { userid } = useParams();
  let navigate = useNavigate();
  // const match = useMatch();
  // const location = useLocation();

  const edit = strData.list.list.filter((x) => {
    return x.id === userid;
  });

  //States
  const [stusername, setstusername] = useState(edit[0].username);
  const [stemail, setstemail] = useState(edit[0].email);
  // console.log("match", match);
  // console.log(location);

  useEffect(() => {
    console.log("userid", edit);
    // uname.current.value = "new";
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "email") setstemail(value);
    if (name == "username") setstusername(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputMail = stemail;
    const inputUser = stusername;
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
    const user = { username: inputUser, email: inputMail, id: userid };

    try {
      // qckDispatch(strUpdate(user, qckDispatch));

      qckDispatch(updateList(user)); // Error is solved by using useDispatch instead of regular action call like in next line.
      //updateList(user);
      navigate("/user/userlist/");
    } catch (error) {}
  };

  return (
    <div>
      <h1>Profile</h1>
      <Container>
        <Row>
          <Col></Col>
          <Col md={6} xs={8} className="align-self-center">
            <h2>{userid}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address: {edit[0].email}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="New email"
                  //   ref={umail}
                  value={stemail}
                  onChange={handleChange}
                  name="email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username: {edit[0].username}</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Username"
                  // ref={uname}
                  value={stusername}
                  onChange={handleChange}
                  name="username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Link className="btn btn-success" to="/user/userlist">
                Goback
              </Link>
            </Form>
            <Button
              onClick={() => {
                fetchLists(qckDispatch);
              }}
            >
              Fetch
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditUser;
