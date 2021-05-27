"use strict";
const User = require("../models/user");
const Location = require("../models/location");
const POI = require("../models/poi-db");
const Boom = require("@hapi/boom");
const utils = require("./utils.js");
const ImageStore = require('../utils/image-store');
const Joi = require('@hapi/joi');

const Poi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      const pois = await POI.find().populate("location").populate("person").lean();
      return pois;
    },
  },
  findByPoi: {
    auth: false,
    handler: async function(request, h) {
      console.log("Test2");
      const pIdd = request.params.id;
      console.log(pIdd);
      let pois = await POI.find({ person: pIdd });
      console.log(pois);
      return pois;
    },
  },
  makePoi: {
      auth: {
        strategy: "jwt",
      },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let poi = new POI(request.payload);

      console.log(poi);
      let file = request.payload.imagefile;
      let location = request.payload.location;
      let loc = new Location(request.payload);
      let weathers = await utils.getWeather(location);

      console.log(location.lng);
      const ans = await ImageStore.uploadImage(file);
      console.log(userId);
      console.log(ans.secure_url);
      console.log(weathers);
      poi.person = userId;
      loc.lat = location.lat;
      loc.lng = location.lng;
      loc = await loc.save();
      let locId = loc._id;

      poi.location = locId;
      poi.imagefile = ans.secure_url;
      poi.weather = weathers;
      poi = await poi.save();
      console.log(poi);
      return poi;


    },
  },
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
          let p_id = request.params.id;
          console.log(p_id);
          const poi = await POI.deleteOne({ _id: p_id });
          if (poi.deletedCount == 1) {
            console.log('yoho');
            return { success: true };
          }
          return Boom.notFound("id not found");
        },
      },
  editPoi: {
    auth: false,
    handler: async function(request, h) {
      const poiEdit = request.payload;
      console.log(poiEdit);
      const poId = poiEdit.id;
      console.log(poId);
      let file = poiEdit.imagefile;
      const ans = await ImageStore.uploadImage(file);
      let poi = await POI.findByIdAndUpdate({ _id: poId });
      poi.name = poiEdit.name;
      poi.description = poiEdit.description;
      poi.imagefile = ans.secure_url;
      poi.categories = poiEdit.categories;
      poi.editor = poiEdit.person;
      await poi.save();
      if (poi) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await POI.deleteMany({});
      return { success: true };
    },
  },



  createPoi: {
    auth: false,
    handler: async function(request, h) {
      const pIdd = request.params.id;
      console.log(pIdd);
      let poi = new POI(request.payload);

    //  let loc = new Location(request.payload);
    //  let location = request.payload.location;
     // poi.person = pIdd;

      const user = await User.findOne({ _id: pIdd });
      poi.person = user._id;
      poi = await poi.save();
      console.log(poi);
      return poi;

    },
  },
};

module.exports = Poi;