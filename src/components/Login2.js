import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import { UserContext } from "../contexts/AuthContext";
import { login } from "../actions/loginActions";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [sUser, setsUser] = useState(false);
  // const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [passError, setPerror] = useState(false);
  const [remember, setRemember] = useState(false);

  const {
    user: authuser,
    userData: authUserData,
    login,
    readUser,
  } = useContext(UserContext);

  // const navigate = useNavigate();

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
      const data = await res.data;

      login(data);

      // dispatch({
      //   type: LOGIN_SUCCESS,
      //   payload: { user: data },
      // });

      // const rawpost = await fetch(`http://localhost:5001/users?username=${username}&password=${password}`);

      // const data = await rawpost.json();

      // setsUser({...data});

      console.log(authuser);

      // const {username} = user
      const userRead = await axios.post(
        "https://api.m3o.com/v1/user/Read",
        { username },
        { headers }
      );
      const readData = await userRead.data;

      // setsUser({...sUser,...readData});

      readUser(readData);

      // console.log(readData);
      // console.log(sUser);
      navigate("/user");
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

  //Redux
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

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
      </div>
    </section>
  );
};

export default connect(null, { login })(Login);
