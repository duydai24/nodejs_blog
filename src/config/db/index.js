const mongoose = require('mongoose')


async function connect() {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/f8_education_dev',
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