"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const utils = require("../app/api/utils");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Location API tests", function () {
  let location = fixtures.location;


  const poiService = new PoiService(fixtures.poiService);

  suiteSetup(async function () {
    await poiService.deleteAllLocations();
    const returnedLoc= await poiService.createLocation(location);

  });

  suiteTeardown(async function () {
    await poiService.deleteAllLocations();

  });

  test("create a Location", async function() {
    const returnedLoc = await poiService.createLocation(location);
    console.log(returnedLoc._id);

    const returnedLocations= await poiService.getLocation(returnedLoc._id);
    console.log(returnedLocations);
    assert.equal(returnedLocations.length, 1);
    console.log('ho');
    assert(_.some([returnedLocations, location]), "returned poi must be a superset of poi");
  });
});
