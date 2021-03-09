"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  imagefile: String
});

module.exports = Mongoose.model("Poidb", poiSchema);