"use strict";
const Boom = require("@hapi/boom");
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

userSchema.methods.comparePassword = function(password) {
  const isMatch = this.password === password;
  if (!isMatch) {
    const msg = "Password does not match Email";
    throw Boom.unauthorized(msg);
  }
  return this;
};

module.exports = Mongoose.model("User", userSchema);