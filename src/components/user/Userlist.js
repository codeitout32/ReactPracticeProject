import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

//REdux
import { useDispatch, useSelector } from "react-redux";
import { delItem, fetchLists } from "../../actions/myAuth";
const Userlist = (props) => {
  const qckDispatch = useDispatch();
  const { history } = props;
  const nav = useNavigate();
  let strList = useSelector((state) => state.list.list);
  const goEdit = (para) => {
    return nav(`/user/userlist/${para}`);
  };
  const goDelete = (para) => {
    // strList = strList.filter((x) => x.id !== para);
    if (window.confirm("are you sure?")) delItem(qckDispatch, para);
    fetchLists(qckDispatch);
  };

  console.log("strlist", strList);
  const list = strList.map((item, index) => (
    <tr key={item.id}>
      <th scope="row">{index + 1}</th>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <Button varient="primary" onClick={() => goEdit(item.id)}>
          Edit
        </Button>
      </td>
      <td>
        <Button varient="danger" onClick={() => goDelete(item.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchLists(qckDispatch);
  }, []);

  console.log("list", strList);
  return (
    <div>
      <Container>
        <Link to="/"> Go Back </Link>
        <h2>UserList</h2>
        <h2>List of registerd Users</h2>
        <div className="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
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
      </Container>
    </div>
  );
};

export default Userlist;
