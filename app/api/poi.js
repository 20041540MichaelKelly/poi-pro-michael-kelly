"use strict";
const User = require("../models/user");
const POI = require("../models/poi-db");
const Boom = require("@hapi/boom");

const Poi = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const pois = await POI.find();
      return pois;
    },
  },
  findByPoi: {
    auth: false,
    handler: async function(request, h) {
      const pIdd = request.params.id;
      console.log(pIdd);
      const pois = await POI.find({ person: pIdd });
      console.log(pois);
      return pois;
    },
  },
    makePoi: {
      auth: false,
      handler: async function (request, h) {
        let poi = new POI(request.payload);
        console.log(poi);
        const user = await User.findOne({ _id: request.params.id });
        console.log(user+'ooooo');
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        poi.person = user._id;
        poi = await poi.save();
        console.log(poi);
        return poi;
      },
    },
    deleteAll: {
      auth: false,
      handler: async function (request, h) {
        await POI.deleteMany({});
        return { success: true };
      },
    },
};

module.exports = Poi;