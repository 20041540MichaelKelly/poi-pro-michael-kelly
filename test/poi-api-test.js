"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Donation API tests", function () {
  let pois = fixtures.pois;
  let newUser = fixtures.newUser;
  let loc = fixtures.location;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function() {
    poiService.deleteAllUsers();
    await poiService.deleteAllPoi();
  });

  teardown(async function() {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
    await poiService.deleteAllUsers();
  });

  test("create a poi", async function() {
    console.log(pois[1]);
    const returnedUser = await poiService.deletePoi(pois[1].id);
    if (returnedUser) {
      console.log(pois[1]);
    }

    const lis = await poiService.getPoi(pois[1]._id);
    console.log(lis);


  });




});

