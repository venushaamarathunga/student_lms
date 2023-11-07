import express from "express";
import student_model from "../models/Student_model.js";

const student_router = express.Router();

// @url           POST /student/add
// @description   create new student profile
// @access-mode   private
student_router.route("/add").post(async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    let newStudent = await student_model.findOne({ email });
    if (newStudent) {
      throw new Error("User already exists");
    }

    newStudent = new student_model({
      name,
      email,
      age,
      gender,
    });

    newStudent
      .save()
      .then(() => {
        res.status(200).send({
          status: "Student Added.",
          student: [
            newStudent.name,
            newStudent.email,
            newStudent.age,
            newStudent.gender,
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// @url           GET /student
// @description   Get student profile
// @access-mode   private
student_router.route("/").get((req, res) => {
  student_model
    .find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

// @url           PUT /student/update/:id
// @description   update student profile
// @access-mode   private
student_router.route("/update/:id").put(async (req, res) => {
  let studentId = req.params.id;

  const { name, email, age, gender } = req.body; // de-structred
  const updateStudent = {
    name,
    email,
    age,
    gender,
  };
  if (true) {
    const update = await student_model
      .findByIdAndUpdate(studentId, updateStudent)
      .then(() => {
        res.status(200).send({ status: "User Updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating data", error: err.message });
      });
  }
});

// @url           DELETE /student/delete/:id
// @description   delete student profile
// @access-mode   private
student_router.route("/delete/:id").delete(async (req, res) => {
  let studentId = req.params.id;
  await student_model
    .findByIdAndDelete(studentId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

// @url           GET /student/get/:id
// @description   get one student profile
// @access-mode   private
student_router.route("/get/:id").get(async (req, res) => {
  let studentId = req.params.id;

  const student = await student_model
    .findById(studentId)
    .then((student) => {
      res.status(200).send({ status: "User Fetched", student });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

export default student_router;
