"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  location: String,
  imagefile: String,
  categories: String,
  person: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = Mongoose.model("Poidb", poiSchema);