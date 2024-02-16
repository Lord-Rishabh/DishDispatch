const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;