const Pois= require('./app/api/poi');

module.exports = [
  { method: 'GET', path: '/api/poi', config: Pois.find },
  { method: 'GET', path: '/api/poi/{id}', config: Pois.findOne },
  { method: "POST", path: "/api/poi", config: Pois.create },
  { method: "DELETE", path: "/api/poi/{id}", config: Pois.deleteOne },
  { method: "DELETE", path: "/api/poi", config: Pois.deleteAll },
];