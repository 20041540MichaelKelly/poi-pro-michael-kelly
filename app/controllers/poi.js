'use strict';

const Poidb = require('../models/poi-db');

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
      const newPoi = new Poidb({
        name: data.name,
        description: data.description,
      });
      await newPoi.save();
      return h.redirect("/poiList");
    },
  },
};

module.exports = POI;