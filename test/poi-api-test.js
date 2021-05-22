"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("POI API tests", function () {
  let pois = fixtures.pois;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  suiteSetup(async function () {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });

  suiteTeardown(async function () {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });

  setup(async function () {
   await poiService.deleteAllPoi();
 //  await poiService.deleteAllUsers();
  });

  teardown(async function () {
 //   await poiService.deleteAllPoi();
  });

  test("create a POI", async function () {
    const returnedUser = await poiService.createUser(newUser);
    const hey = await poiService.makePoi(returnedUser._id, pois[1]);
    console.log(hey);
    const returnedPoi = await poiService.getPoi(returnedUser._id);
    //console.log(returnedUser._id);
    assert.equal(returnedPoi.length, 1);
    assert(_.some([returnedPoi[0]], pois[1]), "returned poi must be a superset of poi");
  });

  test("create multiple POIs", async function () {
    const returnedUser = await poiService.createUser(newUser);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePoi(returnedUser._id, pois[i]);
    }

    const returnedPois = await poiService.getPoi(returnedUser._id);
    assert.equal(returnedPois.length, pois.length);
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([returnedPois[i]], pois[i]), "returned POI must be a superset of POI");
    }
  });

 /* test("get POIs details", async function () {
    for (let p of pois) {
      await poiService.makePoi(p);
    }

    const allPois = await poiService.getPois();
    console.log(allPois);
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([allPois[i]], pois[i]), "returnedPoi must be a superset of newPoi");
    }
  });*/

  test("get all POIs empty", async function () {
    const allPois = await poiService.getPois();
    assert.equal(allPois.length, 0);
  });

  test("get invalid POI", async function () {
    const c1 = await poiService.getPoi("1234");
    assert.isNull(c1);
    const c2 = await poiService.getPoi("12345678901234567890123");
    console.log(c2);
    assert.isNull(c2);
  });

  test("delete all POIs", async function () {
    const returnedUser = await poiService.createUser(newUser);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePoi(returnedUser._id, pois[i]);
    }

    const d1 = await poiService.getPoi(returnedUser._id);
    assert.equal(d1.length, pois.length);
    await poiService.deleteAllPoi();
    const d2 = await poiService.getPoi(returnedUser._id);
    assert.equal(d2.length, 0);
  });




});