const POI = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Make a Donation" });
    },
  },
  signup: {
    handler: function (request, h) {
      return h.file('./app/views/signup.hbs');
    },
  },
  login: {
    handler: function (request, h) {
      return h.file('./app/views/login.hbs');
    },
  },
};

module.exports = POI;