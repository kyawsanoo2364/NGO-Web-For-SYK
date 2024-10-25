import mongoose from "mongoose";

const eventModel = new mongoose.Schema({
  logoImage: { type: String, default: null },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const studentSchema = new mongoose.Schema({
  enrollCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  schedule: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  duration: { type: String, required: true },
});

const teacherSchema = new mongoose.Schema({
  subject: [{ type: String, required: true }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Event = mongoose.model("Event", eventModel);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Student = mongoose.model("Student", studentSchema);
const Course = mongoose.model("Course", courseSchema);

export { Event, Teacher, Student, Course };