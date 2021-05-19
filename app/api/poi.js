"use strict";
const User = require("../models/user");
const POI = require("../models/poi-db");
const Boom = require("@hapi/boom");
const utils = require("./utils.js");
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const Joi = require('@hapi/joi');
const axios = require("axios");
const apiKey = process.env.apiKey;
const ImageStore = require('../utils/image-store');

const Poi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const pois = await POI.find().populate("person");
      return pois;
    },
  },
  findByPoi: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      const pIdd = request.params.id;
      console.log(pIdd);
      const pois = await POI.find({ person: pIdd });
      console.log(pois);
      return pois;
    },
  },
    makePoi: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request, h) {
        const userId = utils.getUserIdFromRequest(request);
        let poi = new POI(request.payload);
        let weathers = await utils.getWeather(poi);
       // console.log(weathers);
        poi.person = userId;
        poi.weather = weathers;
        poi = await poi.save();
        console.log(poi);
        return poi;
      },
    },
    deleteAll: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request, h) {
        await POI.deleteMany({});
        return { success: true };
      },
    },
};

module.exports = Poi;