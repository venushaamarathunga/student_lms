import mongoose from "mongoose";
const schema = mongoose.Schema;

const studentSchema = new schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

const student_model = mongoose.model("Student", studentSchema);

export default student_model;
