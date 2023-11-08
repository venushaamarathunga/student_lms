import React, { useState } from "react";
import axios from "axios";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  function sendData(e) {
    e.preventDefault();
    const newStudent = { name, email, age, gender };

    axios
      .post("http://localhost:4440/student/add", newStudent)
      .then(() => {
        alert("student added!");
        setName("");
        setEmail("");
        setAge("");
        setGender("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <h3>Student Create</h3>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            id="exstudentName"
            placeholder="Enter Student Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Student Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Student Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Student Age</label>
          <input
            type="text"
            className="form-control"
            id="exAge"
            placeholder="Enter Student Age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Student Gender</label>
          <input
            type="text"
            className="form-control"
            id="exGender"
            placeholder="Enter Student Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
