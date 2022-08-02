const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema({
  reservationDate: {
    type: Date,
    default: Date.now
  },
  driveway: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Driveway'
    }
  ]
});

const Order = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
