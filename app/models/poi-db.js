"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  location: String,
  lat: Number,
  lng: Number,
  imagefile: String,
  categories: String,
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