"use strict";
const User = require("../models/user");
const POI = require("../models/poi-db");
const Boom = require("@hapi/boom");
const utils = require("./utils.js");
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
        let file = request.payload.imagefile;
        console.log(file);

        let weathers = await utils.getWeather(poi);
       // const getTheImage = utils.getImageAfterUpload(file);
       // console.log(getTheImage);
        const ans = await ImageStore.uploadImage(file);

        poi.person = userId;
        poi.imagefile = ans.secure_url;
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