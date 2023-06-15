const mongoose = require('mongoose')
require('dotenv').config();
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
      });
    console.log('Connect DB successfully!');
  } catch (error) {
    console.log('Connect DB failure!');
  }
}
module.exports = {connect}