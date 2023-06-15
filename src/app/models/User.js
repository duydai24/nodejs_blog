const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
  googleId: {type: String},
  email: {type: String},
  name: {type: String},
  image: {type: String},
  role: {type: String, default: 'user'},
  token: {type: String}
},
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Users', Users);

