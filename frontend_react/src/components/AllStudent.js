import axios from "axios";
import React, { useState, useEffect } from "react";

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
  return (
    <div>
      <h3>All Student </h3>
    </div>
  );
}
