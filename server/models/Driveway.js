const mongoose = require('mongoose');
const { timeStamp } = require('../utils/date');

const { Schema } = mongoose;
const User = require('./User')

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
    default: Date.now,
    get: timeStamp,
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
  },
  isReserved: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp,
      },
    },
  ],
}, 
{
  timestamps: true
});

const Driveway = mongoose.model('Driveway', drivewaySchema);

module.exports = Driveway;
