'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require("../utils/logger");

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  updateUser(user ,id){
    let userToUpdate = this.getUserById(id);
    if(user.email){
      logger.info(`updateing email for user ${id}`);
      userToUpdate.email = user.email
      this.store.save()
    }
    if(user.password){
      logger.info(`updating password for user ${id}`);
      userToUpdate.password = user.password
      this.store.save()
    }
    if(user.firstname){
      logger.info(`updating firstname for user ${id}`);
      userToUpdate.firstName = user.firstname;
      this.store.save();
    }
    if(user.lastname){
      logger.info(`updating lastname: for user ${id}`);
      userToUpdate.lastName = user.lastname;
      this.store.save();
    }
  }
};

module.exports = userStore;