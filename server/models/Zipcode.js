const mongoose = require('mongoose');

const { Schema } = mongoose;

const zipcodeSchema = new Schema({
  zip: {
    type: Number,
    required: true,
    trim: true
  },
  lat: {
    type: Number,
    required: true,
    trim: true
  },
  lon: {
    type: Number,
    required: true,
    trim: true
  }
});

const Zipcode = mongoose.model('Zipcode', zipcodeSchema);

module.exports = Zipcode;
