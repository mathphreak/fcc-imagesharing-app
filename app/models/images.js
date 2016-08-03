'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Image = new Schema({
  url: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Image', Image);
