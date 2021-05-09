'use strict';

const POI = require('../models/poi-db');
const Boom = require("@hapi/boom");

const POIs = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const pois = await POI.find();
      return pois;
    },
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const pois = await POI.findOne({ _id: request.params.id });
        if (!pois) {
          return Boom.notFound("No POI with this id");
        }
        return pois;
      } catch (err) {
        return Boom.notFound("No POI with that ID")
      }
    }
  }
};

module.exports = POIs;