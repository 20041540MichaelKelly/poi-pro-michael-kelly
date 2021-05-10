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
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const newPoi = new POI(request.payload);
      const poi = await newPoi.save();
      if (poi) {
        return h.response(poi).code(201);
      }
      return Boom.badImplementation("error creating POI");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await POI.remove({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const poi = await POI.remove({ _id: request.params.id });
      if (poi) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = POIs;