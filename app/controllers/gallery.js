'use strict';

const ImageStore = require('../utils/image-store');

const Gallery = {
  pindex: {
    handler: async function(request, h) {
      try {
        const allImages = await ImageStore.getAllImages();
        console.log(allImages);
        return h.view('gallery', {
          title: 'Gallery',
          images: allImages
        });
      } catch (err) {
        console.log(err);
      }
    }
  },

  uploadFile: {
    handler: async function(request, h) {
      try {
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          await ImageStore.uploadImage(request.payload.imagefile);
          return h.redirect('/pindex');
        }
        return h.view('gallery', {
          title: 'Cloudinary Gallery',
          error: 'No file selected'
        });
      } catch (err) {
        console.log(err);
      }
    },
    payload: {
      multipart: true,
      output: 'data',
      maxBytes: 209715200,
      parse: true
    }
  },

  deleteImage: {
    handler: async function(request, h) {
      try {
        await ImageStore.deleteImage(request.params.id);
        return h.redirect('/pindex');
      } catch (err) {
        console.log(err);
      }
    }
  }
};

module.exports = Gallery;