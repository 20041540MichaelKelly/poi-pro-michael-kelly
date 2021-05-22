"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
/*  lat: String,
  lon: String, */
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
},
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