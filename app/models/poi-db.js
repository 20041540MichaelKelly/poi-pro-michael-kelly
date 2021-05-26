"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
},
  imagefile: String,
  categories: String,
  rate: Number,
  weather: String,
  editor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  person: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = Mongoose.model("Poidb", poiSchema);