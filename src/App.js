import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forget from "./components/Forget";
import Login from "./components/Login";
import Register from "./components/Register";
import { Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import React, { useState, useEffect, useContext } from "react";

import { connect } from "react-redux";

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
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<Dashboard />} />
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
