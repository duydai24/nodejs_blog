const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;



const Course = new Schema({
  name: {type: String, default: '', maxLength: 255},
  description: {type: String, min: 1, maxLength: 600},
  image: {type: String, maxLength: 255},
  slug: {type: String, slug: "name", unique: true}, //unique k cho 2 cai giong nhau
  //createdAt: {type: Date, default: Date.now},
  //updatedAt: {type: Date, default: Date.now}
},
  {
    timestamps: true,
  },
);

//add plugin
mongoose.plugin(slug);

Course.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true
});

module.exports = mongoose.model('Course', Course)