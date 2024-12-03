const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token:{
      type: String,
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Explicitly set the collection name to 'users'
module.exports = mongoose.model('User', UserSchema, 'users');
