const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
    enum: ['teacher', 'student', 'employee'],
  },
  // courses: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Course', // This refers to the 'Course' model
  // }],
  salary:{
    type:String,
    required:true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;