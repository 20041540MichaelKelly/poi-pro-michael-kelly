'use strict';

const env = require('dotenv');
env.config();

const Hapi = require('@hapi/hapi');
const Inert = require("@hapi/inert");
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');
const Cookie = require("@hapi/cookie");

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

require('./app/models/db');

async function init() {
  await server.register(Cookie);
  await server.register(require('@hapi/Inert'));
  await server.register(require('@hapi/Vision'));
  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false
    },
    redirectTo: "/",
  });

  server.auth.default('session');

  server.route(require('./routes'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();