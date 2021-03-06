const Course = require('../models/course');
const Joi = require('joi')

async function getAllCourses(req, res) {
  // try{
    const courses = await Course.find().exec();
    return res.json(courses);
  // } catch (e) {
  // }
}

async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id)
    .populate('students', { firstName: 1 })//get referred data. Only get students' firstName.
    .exec();
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  return res.json(course);
}

async function addCourse(req, res) {
  // const { code, name, description } = req.body;
  //Joi validate schema, 
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    // COMP1001 SCI2002
    code: Joi.string()
      .regex(/^[a-zA-Z]+[0-9]+$/)
      .required(),
    description: Joi.string(),
  });
  // only get code, name, description from req.body. allow unknown content, but will strip the unknown information.
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true, 
    stripUnknown: true,
  });

  const existingCourse = await Course.findById(code).exec();
  if (existingCourse) {
    return res.status(409).json({ error: 'duplicate course code' });
  }
  const course = new Course({ name, code, description });
  await course.save();
  return res.status(201).json(course);
}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  ).exec();
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  return res.json(course);
}

async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  await Student.updateMany({ courses: code }, { $pull: { courses: code } }).exec();
  return res.sendStatus(204);
}

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  addCourse,
};