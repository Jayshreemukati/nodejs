// models/course.js

const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
  },
  duration: {
    type:String,
    required: true,
  },
  totalamount: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
