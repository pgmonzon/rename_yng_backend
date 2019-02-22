const mongoose = require('mongoose');

const URI = 'mongodb://yngRldd:laser1962@198.100.45.12:27017/yangeeReloaded'
//const URI = 'mongodb://yngee:1962Laser@198.100.45.12:27017/Yangee'

mongoose.connect(URI, { useNewUrlParser: true })
  .then(db => console.log('MongoDB conectada'))
  .catch(err => console.error(err));

module.exports = mongoose;
