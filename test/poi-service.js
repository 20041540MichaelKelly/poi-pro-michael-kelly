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
      return response.data;
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

  async getCandidates() {
    try {
      const response = await axios.get(this.baseUrl + "/api/candidates");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getCandidate(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/candidates/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoi(newPoi) {
    try {
      const response = await axios.post(this.baseUrl + "/api/candidates", newCandidate);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPois() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/poi");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneCandidate(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/candidates/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}

module.exports = PoiService;