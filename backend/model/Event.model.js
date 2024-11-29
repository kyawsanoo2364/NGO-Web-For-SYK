import mongoose from "mongoose";

const eventModel = new mongoose.Schema({
  image: { type: String, default: null },
  imageId: { type: String },
  title_en: {
    type: String,
    required: true,
  },
  title_mm: {
    type: String,
    required: true,
  },
  description_en: {
    type: String,
    required: true,
  },
  description_mm: {
    type: String,
    required: true,
  },
  location_en: {
    type: String,
    required: true,
  },
  location_mm: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
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
