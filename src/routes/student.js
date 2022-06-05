const express = require('express');
const {getAllStudents, getStudentsById, addStudent, updateStudentsById, deleteStudentsById, addStudentToCourse, removeStudentFromCourse} = require('../controllers/student');

const studentRouter = express.Router();

studentRouter.get('', getAllStudents);
studentRouter.get('/:id', getStudentsById);
studentRouter.put('/:id', updateStudentsById);
studentRouter.delete('/:id', deleteStudentsById);
studentRouter.post('', addStudent);
studentRouter.post('/:id/courses/:code', addStudentToCourse);
studentRouter.delete('/:id/courses/:code', removeStudentFromCourse);

module.exports = studentRouter;
