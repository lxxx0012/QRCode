const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  urls: {
    type: [String], // Array of URLs
    required: true
  }
});

module.exports = mongoose.model('QRCode', qrCodeSchema);

