"use strict";

const Locations = require("../models/location");
const Boom = require("@hapi/boom");
const utils = require('./utils.js');

const Location = {
  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const user = await Locations.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound("No Location with this id");
        }
        return user;
      } catch (err) {
        return Boom.notFound("No User with this id");
      }
    },
  },

  createLocation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {

      const newLocation = new Locations(request.payload);
      const loc = await newLocation.save();
      if (loc) {
        return h.response(loc).code(201);
      }
      return Boom.badImplementation("error creating user");
    },
  }

};

module.exports = Location;