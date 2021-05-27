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
    //const returnedLoc = await poiService.createLocation(location);
    console.log(returnedUser._id);
    //console.log(returnedLoc);
    console.log(pois[0]);
    await poiService.createPoi(returnedUser._id, pois[0]);

    const returnedPois = await poiService.getPoi(returnedUser._id);
    console.log(returnedPois);
    assert.equal(returnedPois.length, 1);
    console.log('ho');
    assert(_.some([returnedPois[0]], pois[0]), "returned poi must be a superset of poi");
  });

  test("create multiple Pois", async function () {
    const returnedUser = await poiService.createUser(newUser);
    for (var i = 0; i < pois.length; i++) {
      await poiService.createPoi(returnedUser._id, pois[i]);
    }
    console.log(pois);

    const returnedPois = await poiService.getPoi(returnedUser._id);
    assert.equal(returnedPois.length, pois.length);
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([returnedPois[i]], pois[i]), "returned donation must be a superset of donation");
    }
  });

  test("delete all donations", async function () {
    const returnedUser = await poiService.createUser(newUser);
    for (var i = 0; i < pois.length; i++) {
      await poiService.createPoi(returnedUser._id, pois[i]);
    }

    const p1 = await poiService.getPoi(returnedUser._id);
    assert.equal(p1.length, pois.length);
    await poiService.deleteAllPoi();
    const p2 = await poiService.getPoi(returnedUser._id);
    assert.equal(p2.length, 0);
  });

});

