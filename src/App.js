import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forget from "./components/Forget";
import Login from "./components/Login";
import Register from "./components/Register";
import { Link } from "react-router-dom";
import Dashboard from "./components/user/Dashboard";
import React, { useState, useEffect, useContext } from "react";

import { connect } from "react-redux";
import Userlist from "./components/user/Userlist";
import Profile from "./components/user/Profile";
import EditUser from "./components/user/EditUser";

function App(props) {
  useEffect(() => {
    const user = {
      name: "Leizel",
    };
    // props.setUser(user);
  }, []);

  // console.log(props.currentUser)
  return (
    <Router>
      <section>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/userlist" element={<Userlist />} />
          <Route path="/user/userlist/:userid" element={<EditUser />} />
          <Route path="/user/profile" element={<Profile />} />
        </Routes>
      </section>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state?.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (userObj) => {
      dispatch({ type: "SET_USER", payload: userObj });
    },
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App;
