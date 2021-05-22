"use strict";
const User = require("../models/user");
const Location = require("../models/location");
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
      const pois = await POI.find().populate("location").populate("person").lean();
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
       // let loc = new Location(request.payload);
        console.log(poi);
        let file = request.payload.imagefile;
        let location  = request.payload.location;
        let loc = new Location(request.payload);
        let weathers = await utils.getWeather(location);
       // const getTheImage = utils.getImageAfterUpload(file);
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
  deletePoi: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      let poiId = new POI(request.params.id);
      console.log(poiId);
      await POI.delete({poiId});
      return { success: true };
    },
  },
  editPoi: {
    auth: false,
    handler: async function (request, h) {
      const userEdit = request.payload;
      const userId = utils.getUserIdFromRequest(request);
      const user = await User.findById(userId);
      user.firstName = userEdit.firstName;
      user.lastName = userEdit.lastName;
      user.email = userEdit.email;
      user.password = userEdit.password;
      await user.save();
      if (user) {
        return { success: true };
      }
      return Boom.notFound("id not found");
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