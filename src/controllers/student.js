const Student = require('../models/student');
const Course = require('../models/course');

async function getAllStudents(req, res){
    //Student.find() -> db.students.find
    //query chain .find().sort().limit 
    //.exec() means query chain end
    // const students = await Student.find().exec();// get all fields in the documents
    //only get firstName and lastName
    const students = await Student.find().select('firstName lastName email').exec();
    //res.json({data: students}) in real develop process
    return res.json(students);
}

async function getStudentsById(req, res){
    const { id } = req.params;
    const student = await Student.findById(id).select('firstName lastName email').exec();
    if(!student){
        return res.status(404).json({error: "Student not found"})
    }
    return res.json(student)
}

async function addStudent(req, res){
    const {firstName, lastName, email } = req.body;
    //data validation
    //use Student model creat a new student
    const student = new Student({firstName, lastName, email});
    //insert student to database
    await student.save()
    //deal with error
    return res.status(201).json(student);
}

async function updateStudentsById(req, res){
    const { id } = req.params;
    const {firstName, lastName, email } = req.body;
    const student = await Student.findByIdAndUpdate(
        id,
        {firstName, lastName, email},
        {new: true} //request will get a response which is the updated student.
    ).exec();
    if(!student){
        return res.status(404).json({error: "Student not found"})
    }
    return res.json(student)
}

async function deleteStudentsById(req, res){
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if(!student){
        return res.status(404).json({ error: "Student not found"})
    }
    // Update course if the student id is referred in the course
    await Course.updateMany({ students: id }, { $pull: { students: id } }).exec();
    return res.sendStatus(204);
}

async function addStudentToCourse(req, res) {
    // get student and course id
    const { id, code } = req.params;
    const course = await Course.findById(code).exec();
    let student = await Student.findById(id).exec();
    //if cannot find the student or the course, return. 
    if (!student || !course) {
      return res.status(404).json({ error: 'student or course not found' });
    }
    // Update the student document
    // student.courses.addToSet(code);
    // await student.save();
    // const courseName = course.name;
    student = await Student.findByIdAndUpdate(
      id,
      { $push: { courses: code } },
      { new: true }
    ).exec();
    // Update the course document
    course.students.addToSet(id);
    await course.save();

    return res.json(student);
  }
  
  async function removeStudentFromCourse(req, res) {
    // get student and course id
    const { id, code } = req.params;
    const course = await Course.findById(code).exec();
    let student = await Student.findById(id).exec();
    if (!student || !course) {
      return res.status(404).json({ error: 'student or course not found' });
    }
    student = await Student.findByIdAndUpdate(
      id,
      { $pull: { courses: code } },
      { new: true }
    ).exec();
    await Course.findByIdAndUpdate(code, { $pull: { students: id } }).exec();
  
    return res.json(student);
  }

module.exports = {
    getAllStudents,
    getStudentsById,
    addStudent,
    updateStudentsById,
    deleteStudentsById,
    addStudentToCourse,
    removeStudentFromCourse
}