import { Course, Student } from "../model/Event.model.js";
import User from "../model/User.model.js";

export const enrollCourse = async (req, res) => {
  try {
    const currentUser = req.user;
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ message: "Invalid Course Id" });
    }
    const course = await Course.findById(courseId);
    const user = await User.findById(currentUser._id);
    if (!currentUser.studentId || currentUser.studentId === null) {
      const createStudent = new Student({
        $push: { enrollCourses: course._id },
      });
      await createStudent.save();
      user.studentId = createStudent._id;
      await user.save();
    } else {
      const existCourseId = await Student.findOne({
        _id: currentUser.studentId,
        enrollCourses: { $in: [course._id] },
      });
      if (existCourseId) {
        return res
          .status(400)
          .json({ message: "You have already enrolled for this course." });
      }
      await Student.findByIdAndUpdate(currentUser.studentId, {
        $push: { enrollCourses: course._id },
      });
    }
    res.status(201).json({ message: "Course enrolled successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
