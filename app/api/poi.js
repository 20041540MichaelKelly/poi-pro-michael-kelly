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
    handler: async function (request, h) {
      const pIdd = request.params.id;
      console.log(pIdd);
      const pois = await POI.find({ person: pIdd});
      console.log(pois);
      return pois;
    },
  },

};

module.exports = Poi;