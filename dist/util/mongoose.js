"use strict";

module.exports = {
  mutipleMongooseToObject: function mutipleMongooseToObject(mongooseArray) {
    return mongooseArray.map(function (mongooseArray) {
      return mongooseArray.toObject();
    });
  },
  mongooseToObject: function mongooseToObject(mongooseArray) {
    return mongooseArray ? mongooseArray.toObject() : mongooseArray;
  }
};