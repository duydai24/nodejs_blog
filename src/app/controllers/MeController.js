const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Product = require('../models/Products');


function storedProducts(req, res, next) {

  Promise.all([Product.find({}), Product.countDocumentsDeleted()])
    .then(([products, deleteCount]) => {
      res.render('me/stored-products', {
        products: mutipleMongooseToObject(products),
        deleteCount
      });
    })
    .catch(err => {
      next(err)
    })
  //Course.countDocumentsDeleted()
  //  .then(deleteCount => {
  //    console.log(deleteCount)
  //  })
  //  .catch(err => {
  //    next(err);
  //  });

  //Course.find({})
  //  .then(courses => {
  //    res.render('me/stored-courses', {courses: mutipleMongooseToObject(courses)});
  //  })
  //  .catch(err => {
  //    next(err);
  //  });

}

function trashProducts(req, res, next) {
  Product.findDeleted({})
    .then(products => {
      res.render('me/trash-products', {products: mutipleMongooseToObject(products)});
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {storedProducts, trashProducts};
