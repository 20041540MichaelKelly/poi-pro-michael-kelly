"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Poi API tests", function () {
  let pois = fixtures.pois;
  let newUser = fixtures.newUser;
  let location = fixtures.location;
  console.log(location);

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
    const returnedUser = await poiService.createUser(newUser);
    const returnedLoc = await poiService.createLocation(location);
    console.log(returnedUser._id);
    console.log(returnedLoc._id);
    console.log(pois[0]);

    const ans = await poiService.createPoi(returnedUser._id, returnedLoc._id, pois[0]);
    console.log(ans);
    const returnedPois = await poiService.getPoi(returnedUser._id);
    assert.equal(returnedPois.length, 1);
    assert(_.some([returnedPois[0]], pois[0]), "returned donation must be a superset of donation");
  });

});

