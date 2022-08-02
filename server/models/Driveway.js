const mongoose = require('mongoose');

const { Schema } = mongoose;

const drivewaySchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  rules: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  availableDate: {
    type: Date,
    default: Date.now
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Schema.Types.ObjectId,
    ref: 'Zipcode',
    required: true
  }
});

const Driveway = mongoose.model('Driveway', drivewaySchema);

module.exports = Driveway;
