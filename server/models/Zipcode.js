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
    trim: true
  },
  lon: {
    type: Number,
    trim: true
  },
  city: {
    type: String
  },
  state_id: {
    type: String
  },
  state_name: {
    type: String
  },
});

const Zipcode = mongoose.model('Zipcode', zipcodeSchema);

module.exports = Zipcode;
