"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("POI API tests", function () {
  test("get pois", async function () {
    const response = await axios.get("http://localhost:3000/api/poi");
    const pois = response.data;
    assert.equal(9, pois.length);

    assert.equal(pois[0].name, "Great Island");
    assert.equal(pois[0].weather, "Sunny");
    assert.equal(pois[0].location, "Cork");

    assert.equal(pois[1].name, "Cape Clear Island");
    assert.equal(pois[1].weather, "Cloudy");
    assert.equal(pois[1].location, "Cork");
  });

  test("get one poi", async function () {
    let response = await axios.get("http://localhost:3000/api/poi");
    const pois = response.data;
    assert.equal(9, pois.length);

    const onePoiUrl = "http://localhost:3000/api/poi/" + pois[0]._id;
    response = await axios.get(onePoiUrl);
    const onePoi = response.data;

    assert.equal(onePoi.name, "Great Island");
    assert.equal(onePoi.weather, "Sunny");
    assert.equal(onePoi.location, "Cork");
  });

  test("create a POI", async function () {
    const poiUrl = "http://localhost:3000/api/poi";
    const newPoi = {
      name: "Comeragh Island",
      description: "Nice",
      location: "Waterford",
      weather: "Raining",
      imagefile: "https://res.cloudinary.com/michaelkelly20041540/image/upload/v1616012222/temp_opqaaw.jpg",
      categories: "South",
      person: "->user.Sarah"
    };

    const response = await axios.post(poiUrl, newPoi);
    console.log(response);
    const returnedPoi = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedPoi.name, "Comeragh Island");
    assert.equal(returnedPoi.location, "Waterford");
    assert.equal(returnedPoi.weather, "Raining");
    assert.equal(returnedPoi.imagefile, "https://res.cloudinary.com/michaelkelly20041540/image/upload/v1616012222/temp_opqaaw.jpg");
    assert.equal(returnedPoi.categories, "South");
    assert.equal(returnedPoi.person, "2d3e757365722e5361726168");
  });

  test("delete a POI", async function () {
    let response = await axios.get("http://localhost:3000/api/poi");
    let pois = response.data;
    const originalSize = pois.length;

    const onePoiUrl = "http://localhost:3000/api/poi/" + pois[9]._id;
    response = await axios.get(onePoiUrl);
    const onePoi = response.data;
    assert.equal(onePoi.name, "Comeragh Island");

    response = await axios.delete("http://localhost:3000/api/poi/" + pois[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get("http://localhost:3000/api/poi");
    pois = response.data;
    assert.equal(pois.length, originalSize - 1);
  });

  test("delete all Pois", async function () {
    let response = await axios.get("http://localhost:3000/api/poi");
    let pois = response.data;
    const originalSize = pois.length;
    assert(originalSize > 0);
    response = await axios.delete("http://localhost:3000/api/poi");
    response = await axios.get("http://localhost:3000/api/poi");
    pois = response.data;
    assert.equal(pois.length, 0);
  });
});