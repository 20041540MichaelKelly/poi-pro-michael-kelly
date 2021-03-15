'use strict';

const Poidb = require('../models/poi-db');
const Images = require('../models/images');
const ImageStore = require('../utils/image-store');
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const POI = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Make a Donation" });
    },
  },
  poiList: {
    handler: async function (request, h) {
      const pois = await Poidb.find().lean();

      return h.view("poiList", {
        title: "POI of Islands",
        pois: pois,
      });
    },
  },
  poiAdd: {
    handler: async function (request, h) {
      const data = request.payload;
      console.log(data);
      const image = {};
      try {
        const file = request.payload.imagefile;

        if (Object.keys(file).length > 0) {
          // await ImageStore.uploadImage(request.payload.imagefile);
          // const allImages = ImageStore.getAllImages();
          await writeFile('./public/temp.img', file);
         const ans = await cloudinary.uploader.upload('./public/temp.img');


          const newPoi = new Poidb({
              name: data.name,
              description: data.description,
              imagefile: ans.secure_url

            });
          await newPoi.save();
          console.log(newPoi);
          return h.redirect('/poiList');
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
  delete: {
    auth: false,
    handler: async function(req, h) {
      try {
        const id = req.params.id;
        console.log(id);
        await Poidb.findByIdAndDelete(id).lean();
        //  return h.response(user);
        // await user.save();
        return h.redirect("/poiList");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
      // }
    }
  },
  edit: {
    auth: false,
    handler: async function(request, h) {
      try {
        const result = await Poidb.findByIdAndUpdate(
          request.params.id,
          request.payload,
          { new: true }
        ).lean();
        //return h.response(result);
        console.log(result);
        return h.view("updatePoi", { poi: result });
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  },
  updatePoi: {
    auth: false,
    handler: async function(request, h) {
      const id = request.params.id;
      const use = await Poidb.findById(id);
      const data = request.payload;
      use.title = data.title;
      use.description = data.description;

      await use.save();

      return h.redirect("/poiList");
    }
  }
};

module.exports = POI;