"use strict";

const Accounts = require("./app/controllers/accounts");
const POI = require('./app/controllers/poi');

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: "GET", path: "/home", config: POI.home },
  { method: "GET", path: "/poiList", config: POI.poiList },
  { method: 'POST', path: '/poiAdd', config: POI.poiAdd },

  { method: 'GET', path: '/edit/{id}', config: POI.edit },
  { method: 'POST', path: '/delete/{id}', config: POI.delete },
  { method: 'POST', path: '/updatePoi/{id}', config: POI.updatePoi },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public"
      }
    },
    options: { auth: false }
  },
];