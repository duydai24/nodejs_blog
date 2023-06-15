const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;



const Product = new Schema({
  name: {type: String, default: '', maxLength: 255},
  description: {type: String, min: 1, maxLength: 10000},
  image: {type: String, maxLength: 255},
  imageBase64: {type: String},
  star: {type: String, maxLength: 20},
  price: {type: Number, maxLength: 100},
  sale: {type: Number, maxLength: 100},
  sold: {type: Number, maxLength: 50},
  address: {type: String, maxLength: 2000},
  slug: {type: String, slug: "name", unique: true}, //unique k cho 2 cai giong nhau
},
  {
    timestamps: true,
  },
);

//add plugin
mongoose.plugin(slug);

Product.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true
});

module.exports = mongoose.model('Product', Product)