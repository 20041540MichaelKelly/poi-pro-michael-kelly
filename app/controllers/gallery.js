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