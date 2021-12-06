import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/AuthContext";
import axios from "axios";

//Redux
import { useDispatch, useSelector, connect } from "react-redux";
import { logout as strLogout, setList } from "../../actions/loginActions";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [authUser, setAuth] = useState(false);
  const [list, setList2] = useState("hello");
  const [srchfld, setSrchfld] = useState("");

  const storeData = useSelector((user) => user);

  //useContext
  const {
    user: usersess,
    userData: authUserData,
    logout,
  } = useContext(UserContext);

  // Redux

  const qckDispatch = useDispatch();

  useEffect(() => {
    if (!storeData.session.userData) navigate("/login");

    setAuth(storeData.session.userData);
    console.log("authuser", authUser);
    console.log("storedata", storeData);
    listUser();
  }, [storeData.session.userData]);

  useEffect(() => {
    console.log("authuser", authUser);
  }, [authUser]);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "search") setSrchfld(value);

    srchRes(value);
  };

  const srchRes = (x) => {
    const srchDta = storeData.list.list.filter((item) => {
      return item.username.toLowerCase().includes(x.toLowerCase());
    });
    makeTable(srchDta);
  };

  const makeTable = (list) => {
    const getDate = (dateString) => {
      // console.log(dateString);
      const date = new Date(parseInt(dateString));
      return date.toDateString();
    };
    const listTble = list.map((item, index) => (
      <tr key={item.id}>
        <th scope="row">{index + 1}</th>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{getDate(item.created)}</td>
      </tr>
    ));
    setList2(listTble);
  };

  const listUser = async () => {
    const limits = {
      limit: 100,
      offset: 0,
    };

    try {
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
      };

      const res = await axios.post("https://api.m3o.com/v1/user/List", limits, {
        headers,
      });
      const data = res.data;

      console.log("user data", data.users);

      qckDispatch(setList(data.users));

      makeTable(storeData.list.list);
    } catch (error) {
      // setPerror(true);
      if (error.response) console.log(error.response.data);
      else console.log(error.message);
    }
  };

  const handleLogout = () => {
    try {
      console.log("logout");

      qckDispatch(strLogout());
      // logout();
    } catch (error) {
      // setPerror(true);
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          Company name
        </a>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
          name="search"
          onChange={handleOnChange}
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={handleLogout}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/user/profile"> My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/userlist"> UserList</Link>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <button onClick={() => logout()}>Go Back</button>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button className="btn btn-sm btn-outline-secondary">
                    Share
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    Export
                  </button>
                </div>
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar"></span>
                  This week
                </button>
              </div>
            </div>

            {/* <canvas className="my-4" id="myChart" width="900" height="380"></canvas> */}

            {authUser && (
              <div>
                <h2>Hello User {authUser.account.username}</h2>{" "}
                <h2>Your Email is {authUser.account.email}</h2>
              </div>
            )}

            <h2>List of registerd Users</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  {list}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// export default connect(null, { setList })(Dashboard);
