'use strict';

const Poidb = require('../models/poi-db');
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require('@hapi/joi');
const axios = require("axios");
const apiKey = process.env.apiKey;
const ImageStore = require('../utils/image-store');

const POI = {
    home: {
      handler: async function(request, h) {
        //const categories = await Categories.find().lean();
        return h.view("home", { title: "Create a POI" });
      },
    },
    poiList: {
      handler: async function(request, h) {
        const pois = await Poidb.find().sort("categories").populate("person").lean();
        return h.view("poiList", {
          title: "POI of Islands",
          pois: pois
        });
      },
    },
    poiAdd: {
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          imagefile: Joi.any().required(),
          categories: Joi.string().required(),
        },
        options: {
          abortEarly: false,
        },
        failAction: function(request, h, error) {
          return h
            .view("home", {
              title: "Sign up error",
              errors: error.details,
            })
            .takeover()
            .code(400);
        },
      },
      // auth: false,
      handler: async function(request, h) {
        try {
          const data = request.payload;
          console.log(data);
          const file = request.payload.imagefile;
          const id = request.auth.credentials.id;
          const user = await User.findById(id);
          console.log(id);
          let weathers = null;
          const ans = await ImageStore.uploadImage(file);
          console.log(ans);
          const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${data.location}&appid=${apiKey}`;
          const response = await axios.get(weatherRequest);
          if (response.status == 200) {
            weathers = response.data;
            console.log(weathers);
          }
          console.log(weathers);
          const newPoi = new Poidb({
            name: data.name,
            description: data.description,
            location: data.location,
            imagefile: ans.secure_url,
            person: user._id,
            categories: data.categories,
            weather: weathers.weather[0].description,
          });
          await newPoi.save();
          console.log(newPoi);
          return h.redirect('/poiList');
      }catch(err) {
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
        name: Joi.string(),
        description: Joi.string(),
        location: Joi.string(),
        imagefile: Joi.any(),
        categories: Joi.string(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function(request, h, error) {
        return h
          .view("updatePoi", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    // auth: false,
    handler: async function(request, h) {
      try {
        const id = request.params.id;
        const use = await Poidb.findById(id);
        const ids = request.auth.credentials.id;
        const user = await User.findById(ids);
        const data = request.payload;
        console.log(user.firstName);
        const file = request.payload.imagefile;

        console.log(file);
        let img = await ImageStore.uploadImage(file);
        console.log(img);

        let weathers = null;

        const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${data.location}&appid=${apiKey}`;
        const response = await axios.get(weatherRequest);
        if (response.status == 200) {
          weathers = response.data;
        }

        use.name = data.name;
        use.description = data.description;
        use.location = data.location;
        use.weather = weathers.weather[0].description;
        use.imagefile = img.secure_url;
        use.editor = user.firstName;

        await use.save();
        return h.redirect("/poiList");
      }catch(err) {
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

  adminHome: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const userss = await User.findById(id);
      const noOf = await User.find().lean().countDocuments(function(err, count){
      });
      const noOfPoi = await Poidb.find().lean().countDocuments(function(err, count){
      });
      console.log(noOf);
      console.log(noOfPoi);
      return h.view("adminHome", { title: "Admin Home", userss: userss.firstName, noOf: noOf, noOfPoi: noOfPoi  });
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

  deleteUser: {
    auth: false,
    handler: async function(req, h) {
      try {
        const id = req.params.id;
        console.log(id);
        await User.findByIdAndDelete(id).lean();
        return h.redirect("/userList");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
      // }
    }
  },
  adminPoiList: {
    handler: async function (request, h) {
      const pois = await Poidb.find().sort("categories").populate("person").lean();
      return h.view("adminPoiList", {
        title: "ADMIN: POI of Islands",
        pois: pois
      });
    },
  },
};

module.exports = POI;