'use strict';

const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


const ImageStore = {
  configure: function() {
    const credentials = {
      cloud_name: process.env.name,
      api_key: process.env.key,
      api_secret: process.env.secret
    };
    cloudinary.config(credentials);
  },

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function(file) {

    await writeFile('./public/temp.img', file);
    const res = await cloudinary.uploader.upload('./public/temp.img',
      function(error, result) {console.log(result, error); });
    return res;
  },

  deleteImage: async function(id) {
    await cloudinary.v2.uploader.destroy(id, {});
  },

};

module.exports = ImageStore;