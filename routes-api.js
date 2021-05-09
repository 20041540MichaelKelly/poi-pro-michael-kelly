const Pois= require('./app/api/poi');

module.exports = [
  { method: 'GET', path: '/api/poi', config: Pois.find },
  { method: 'GET', path: '/api/poi/{id}', config: Pois.findOne }
];