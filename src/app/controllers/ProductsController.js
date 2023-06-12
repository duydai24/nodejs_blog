const {mutipleMongoose, mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const Product = require('../models/Products');

function index(req, res, next) {
  Product.find({})
    .then(product => {
      res.render('products/index', {product: mutipleMongooseToObject(product)});
    })
    .catch(err => {
      next(err);
    });
}

// [GET] /course
function show(req, res, next) {

  Product.findOne({slug: req.params.slug})
    .then(product => {
      res.render('me/stored/products', {product: mongooseToObject(product)});
    })
    .catch(err => {
      next(err);
    });
}


// [GET] /course/create
function create(req, res, next) {

  res.render('products/create')
}
// [POST] /course/store
function store(req, res, next) {
  const formData = req.body;
  // formData.image = 'text'
  const product = new Product(formData);
  product.save()
    .then(() => {
      res.redirect(`/products`);
    })
    .catch(err => {
      next(err);
    });
}

function edit(req, res, next) {
  Product.findById(req.params.id)
    .then(product => {
      res.render('products/edit', {product: mongooseToObject(product)});
      console.log(123);
    })
    .catch(err => {
      next(err);
    });
  //res.render('courses/edit')
}

function update(req, res, next) {
  Product.updateOne({_id: req.params.id}, req.body)
    .then(() => {
      res.redirect('/me/stored/products');
    })
    .catch(err => {
      next(err);
    });
}

function deleteProduct(req, res, next) {
  Product.delete({_id: req.params.id})
    .then(() => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
}

function deleteProductForever(req, res, next) {
  Product.deleteOne({_id: req.params.id})
    .then(() => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
}

function restore(req, res, next) {
  Product.restore({_id: req.params.id})
    .then(() => {
      res.redirect('back');
    })
    .catch(err => {
      next(err);
    });
}


function handleFormAction(req, res, next) {
  switch (req.body.action) {
    case 'delete':
      Product.delete({_id: {$in: req.body.productIds}})
        .then(() => {
          res.redirect('back');
        })
        .catch(err => {
          next(err);
        });
      break;
    default:
      res.json({message: 'Action error!'})
  }
}

module.exports = {index, show, create, store, edit, update, deleteProduct, deleteProductForever, restore, handleFormAction};
