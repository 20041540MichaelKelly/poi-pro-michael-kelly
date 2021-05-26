const Poi= require('./app/api/poi');
const Users= require('./app/api/users');
const Images = require("./app/api/images");
const Location= require('./app/api/location');

module.exports = [
  { method: "GET", path: "/api/poi", config: Poi.findAll },
  { method: "GET", path: "/api/users/{id}/poi", config: Poi.findByPoi },
  { method: "POST", path: "/api/poi/createPoi", config: Poi.createPoi },
  { method: "POST", path: "/api/poi", config: Poi.makePoi },
  { method: "PUT", path: "/api/poi", config: Poi.editPoi },
  { method: "DELETE", path: "/api/poi", config: Poi.deleteAll },
  { method: "DELETE", path: "/api/poi/deleteOne/{id}", config: Poi.deleteOne },

  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },
  { method: "PUT", path: "/api/users/{id}", config: Users.update },

  { method: "POST", path: "/api/location", config: Location.createLocation },


  { method: "GET", path: "/api/images", config: Images.findAll }
];