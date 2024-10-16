const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  // Username of the user
  username: {
    type: String,
    required: true, // This field is mandatory
  },
  // Email of the user (must be unique)
  email: {
    type: String,
    required: true, // This field is mandatory
    unique: true, // Ensures email is unique across all users
  },
  // Password for the user's account
  password: {
    type: String,
    required: true, // This field is mandatory
  },
});

// Export the User model for use in other parts of the application
module.exports = mongoose.model('User', UserSchema);

