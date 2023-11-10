import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllStudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    function getStudents() {}
    axios
      .get("http://localhost:4440/student/", setStudents)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    getStudents();
  }, []);

  const deleteItem = async (e) => {
    console.log(e);
    await axios
      .delete(`http://localhost:4440/student/delete/${e._id}`)
      .then((res) => {
        console.log(res.data);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container">
      <h3 className="container">All Student </h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0
            ? students.map((list, index) => (
                <tr key={index}>
                  <td>{list.name}</td>
                  <td>{list.email}</td>
                  <td>{list.age}</td>
                  <td>{list.gender}</td>
                  <td>
                    <Link to={"/update"}>
                      <button type="button" className="btn btn-sm btn-success">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteItem(list)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      className="btn btn-sm btn-primary"
                      to={`/get/${list}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            : "No Student records"}
        </tbody>
      </table>
    </div>
  );
}
