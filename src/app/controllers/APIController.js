const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Product = require('../models/Products');

function apiProducts(req, res, next) {
  Product.find({})
    .then(product => {
      res.status(200).json({product: mutipleMongooseToObject(product)});
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {apiProducts};
