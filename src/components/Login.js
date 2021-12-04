import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/AuthContext";

//Redux
import { login, getData } from "../actions/loginActions";
import { useDispatch, useSelector, connect } from "react-redux";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [sUser, setsUser] = useState(false);
  // const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [passError, setPerror] = useState(false);
  const [remember, setRemember] = useState(false);
  const [test, setTest] = useState(false);

  const {
    user: authuser,
    userData: authUserData,
    login: conLogin,
    readUser,
  } = useContext(UserContext);

  const storUser = useSelector((user) => user);
  const navigate = useNavigate();
  useEffect(() => {
    if (storUser.session.user) {
      console.log("storuser", storUser);

      conLogin(storUser.session.user);
      readUser(storUser.session.userData);
      navigate("/");
    }
  }, [storUser]);

  useEffect(() => {
    if (test) navigate("/register");
  }, [test]);

  // const navigate = useNavigate();

  const checkStore = () => {
    console.log(storUser);
    if (storUser?.user) {
      console.log("storuser", storUser);
      navigate("/user");
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log(name + "  " + value);

    if (name == "username") setUsername(value);
    if (name == "pass") setPassword(value);
    if (name == "rememberMe") setRemember(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      console.log("submitted");

      setsUser(false);

      const inUser = { username, password };

      senData(inUser);
    } catch (error) {
      setPerror(true);
      console.log(passError);
    }
  };

  const senData = async (user) => {
    try {
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
      };

      const res = await axios.post("https://api.m3o.com/v1/user/Login", user, {
        headers,
      });
      const data = res.data;

      conLogin(data);

      // const rawpost = await fetch(`http://localhost:5001/users?username=${username}&password=${password}`);

      // const data = await rawpost.json();

      // setsUser({...data});

      console.log(authuser);

      props.login(data);

      // const {username} = user
      const userRead = await axios.post(
        "https://api.m3o.com/v1/user/Read",
        { username },
        { headers }
      );
      const readData = await userRead.data;

      // setsUser({...sUser,...readData});

      readUser(readData);

      await props.getData(readData);

      console.log("storuser", storUser);
      // console.log(readData);
      // console.log(sUser);
      // navigate("/user");
    } catch (error) {
      setPerror(true);
      if (error.response) console.log(error.response.data);
      else console.log(error.message);
    }

    if (sUser.length) {
      console.log("login");
      console.log(sUser);
      navigate("/user");
    } else console.log("not login");
  };

  return (
    <section>
      <div className="">
        <form className="form-signin" onSubmit={handleLogin}>
          {sUser && (
            <div>
              <h3>Hello {sUser.username} </h3>
              <p>Ur email is {sUser.email}</p>
              <button onClick={() => setsUser("")}>Logout </button>
            </div>
          )}
          <h2 className="form-signin-heading">Please login</h2>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={username}
            required=""
            autofocus=""
          />
          <input
            type="password"
            className="form-control"
            name="pass"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required=""
          />
          <label className="checkbox">
            <input
              type="checkbox"
              value="remember-me"
              id="rememberMe"
              name="rememberMe"
            />{" "}
            Remember me
          </label>
          {passError && <p className="alert-danger">Invalid Combination</p>}

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
          <p>
            {" "}
            <Link to="/forget" className="forgpass">
              Forget Your Password?
            </Link>
          </p>
          <Link to="/register" className="forgpass">
            Register
          </Link>

          {/* <p>Username: `{authuser.name}`</p> */}
        </form>
        <button
          onClick={() => {
            setTest(true);
            console.log(test);
          }}
        >
          check1
        </button>
      </div>
    </section>
  );
};

export default connect(null, { login, getData })(Login);
