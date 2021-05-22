"use strict";

const axios = require("axios");

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
    //  return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deletePoi(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/poi/deletePoi" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async makePoi(id, poi) {
    try {
      const response = await axios.post(this.baseUrl + "/api/poi", poi);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id + "/poi");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPois() {
    try {
      const response = await axios.get(this.baseUrl + "/api/poi");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPoi() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/poi");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }
}

module.exports = PoiService;