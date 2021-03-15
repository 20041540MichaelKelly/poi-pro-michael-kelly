'use strict';

const Poidb = require('../models/poi-db');
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require('@hapi/joi');

const POI = {
  home: {
    handler: async function (request, h) {
      //const categories = await Categories.find().lean();
      return h.view("home", { title: "Create a POI" });
    },
  },
  poiList: {
    handler: async function (request, h) {
      const pois = await Poidb.find().sort("categories").populate("person").lean();
      return h.view("poiList", {
        title: "POI of Islands",
        pois: pois,
      });
    },
  },
  poiAdd: {
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string().required(),
          imagefile: Joi.string().required(),
          categories: Joi.string().required(),
        },
        options: {
          abortEarly: false,
        },
        failAction: function (request, h, error) {
          return h
            .view("home", {
              title: "Sign up error",
              errors: error.details,
            })
            .takeover()
            .code(400);
        },
      },
      auth: false,
    handler: async function (request, h) {
      try {
        const data = request.payload;
        console.log(data);
        const file = request.payload.imagefile;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);

        if (Object.keys(file).length > 0) {
          await writeFile('./public/temp.img', file);
          const ans = await cloudinary.uploader.upload('./public/temp.img');

          const newPoi = new Poidb({
            name: data.name,
            description: data.description,
            imagefile: ans.secure_url,
            person: user._id,
            categories: data.categories
            });
          await newPoi.save();
          console.log(newPoi);
          return h.redirect('/poiList');
        }
        return h.view('poiList', {
          title: 'List of POIs',
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
    validate: {
      payload: {
        name: Joi.string().required(),
        description: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("updatePoi", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    auth: false,
    handler: async function(request, h) {
      const id = request.params.id;
      const use = await Poidb.findById(id);
      const data = request.payload;

        use.name = data.name;
        use.description = data.description;
       // use.imagefile = ans.secure_url;
        //use.person = data.person._id;

        await use.save();

      return h.redirect("/poiList");
    }
  },

  adminHome: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const userss = await User.findById(id);
      console.log(userss);
      return h.view("adminHome", { title: "Admin Home", userss: userss.firstName  });
    },
  },

  userList: {
    handler: async function (request, h) {
      const users = await User.find().lean();
      return h.view("userList", {
        title: "User List",
        users: users,
      });
    },
  },
};

module.exports = POI;