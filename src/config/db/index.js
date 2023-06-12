const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://duydai24:Opklnm2410@cluster0.dxon8lq.mongodb.net/?retryWrites=true&w=majority',
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