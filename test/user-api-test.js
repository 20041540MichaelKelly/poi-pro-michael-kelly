"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const utils = require("../app/api/utils");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
  let users = fixtures.users;

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

  test("create a user", async function () {
    const returnedUser = await poiService.createUser(newUser);
    console.log(returnedUser);
    console.log("test3");
    console.log(newUser);
    assert(_.some([returnedUser._id], newUser._id), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);
  });

  test("get user", async function () {
    const u1 = await poiService.createUser(newUser);
    let id = u1._id;
    const u2 = await poiService.getUser(id);
    console.log(u2);
    assert.deepEqual(u1, u2);
  });

  test("get invalid user", async function () {
    const u1 = await poiService.getUser("1234");
    assert.isNull(u1);
    const u2 = await poiService.getUser("012345678901234567890123");
    assert.isNull(u2);
  });

  test("delete a user", async function () {
    let u = await poiService.createUser(newUser);
    assert(u._id != null);
    await poiService.deleteOneUser(u._id);
    u = await poiService.getUser(u._id);
    assert(u == null);
  });

  test("get all users", async function () {
    await poiService.deleteAllUsers();
    await poiService.createUser(newUser);
    await poiService.authenticate(newUser);
    for (let u of users) {
      await poiService.createUser(u);
    }

    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, users.length + 1);
  });



  test("get all users empty", async function () {
    await poiService.deleteAllUsers();
    const user = await poiService.createUser(newUser);
    await poiService.authenticate(newUser);
    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, 1);
  });
});