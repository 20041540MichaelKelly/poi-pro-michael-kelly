"use strict";

const jwt = require('jsonwebtoken');
const User = require("../models/user");
const axios = require("axios");
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);



exports.createToken = function (user) {
  return jwt.sign({ id: user._id, email: user.email }, 'secretpasswordnotrevealedtoanyone', {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

exports.decodeToken = function (token) {
  var userInfo = {};
  try {
    var decoded = jwt.verify(token, 'secretpasswordnotrevealedtoanyone');
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e) {
  }

  return userInfo;
};

exports.validate = async function (decoded, request) {
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

exports.getUserIdFromRequest = function (request) {
  var userId = null;
  try {
    const authorization = request.headers.authorization;
    var token = authorization.split(" ")[1];
    var decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone");
    userId = decodedToken.id;
  } catch (e) {
    userId = null;
  }
  return userId;
};

exports.getWeather = async function (poi) {
  let location = null;
  let weathers = null;
  try {
     location = poi.location;
    const apiKey = "d5891296b7768edd9f570dec3aa42a4f";
    const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const response = await axios.get(weatherRequest);
    if (response.status == 200) {
      weathers = response.data;
      weathers = weathers.weather[0].description;
      //console.log(weathers);
    }
   // console.log(weathers);
  } catch (e) {
    weathers = null;
  }
  return weathers;
};


exports.uploadImage = async function(file) {
  await writeFile('./public/temp.img', file);
  const res = await cloudinary.uploader.upload('./public/temp.img');
  return res;
};