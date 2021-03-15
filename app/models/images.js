"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
  public_id: String,
  url: String,

});

module.exports = Mongoose.model("Images", imageSchema);