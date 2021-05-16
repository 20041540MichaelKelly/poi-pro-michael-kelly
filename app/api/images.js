"use strict";

const Image = require('../utils/image-store');
const Boom = require("@hapi/boom");

const Images = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const images = await Image.find();
      return images;
    },
  },
};

module.exports = Images;