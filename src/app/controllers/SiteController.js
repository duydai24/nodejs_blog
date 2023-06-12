const {mutipleMongoose} = require('../../util/mongoose');
const Product = require('../models/Products');
const {mutipleMongooseToObject} = require('../../util/mongoose')

function index(req, res, next) {
    Product.find({})
        .then(products => {
            res.render('home', {products: mutipleMongooseToObject(products)});
        })
        .catch(err => {
            next(err);
        });
    //res.render('home');
}

// [GET] /search
function show(req, res) {
    res.render('search');
}

module.exports = {index, show};
