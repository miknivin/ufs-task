import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
});

const educationSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  shortNote: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  professionalSummary: {
    type: String,
    required: true,
  },
  experience: [experienceSchema],
  education: [educationSchema],
  skills: {
    type: [String],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
