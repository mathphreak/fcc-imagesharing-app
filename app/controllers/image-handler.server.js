'use strict';

var Images = require('../models/images.js');

function ImageHandler() {
  this.getAllImages = function (req, res) {
    Images
      .find({})
      .populate('owner')
      .exec(function (err, result) {
        if (err) {
          throw err;
        }

        res.json(result);
      });
  };

  this.getUserImages = function (req, res) {
    Images
      .find({owner: req.params.id})
      .populate('owner')
      .exec(function (err, result) {
        if (err) {
          throw err;
        }

        res.json(result);
      });
  };

  this.createImage = function (req, res) {
    Images
      .create({owner: req.user._id, url: req.body.url}, function (err) {
        if (err) {
          throw err;
        }

        res.redirect('/');
      });
  };

  this.deleteImage = function (req, res) {
    Images
      .findOneAndRemove({_id: req.params.id, owner: req.user._id})
      .exec(function (err) {
        if (err) {
          throw err;
        }

        res.status(200).end();
      });
  };
}

module.exports = ImageHandler;
