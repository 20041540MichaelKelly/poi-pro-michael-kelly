"use strict";
const Boom = require("@hapi/boom");
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const locationSchema = new Schema({
  lat: String,
  lng: String

});

module.exports = Mongoose.model("Location", locationSchema);
