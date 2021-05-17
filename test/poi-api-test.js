"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let pois = fixtures.pois;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function () {
    poiService.deleteAllUsers();
    poiService.deleteAllPoi();
  });

  teardown(async function () {});

  test("create a POI", async function () {
    const returnedUser = await poiService.createUser(newUser);
    const hey = await poiService.makePoi(returnedUser._id, pois[0]);
    console.log(hey);
    const returnedPoi = await poiService.getPoi(returnedUser._id);
    //console.log(returnedUser._id);
    assert.equal(returnedPoi.length, 1);
    assert(_.some([returnedPoi[0]], pois[0]), "returned poi must be a superset of poi");
  });
});