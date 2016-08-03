'use strict';

var bodyParser = require('body-parser');

var path = process.cwd();
var ImageHandler = require(path + '/app/controllers/image-handler.server.js');

module.exports = function (app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  var imageHandler = new ImageHandler();

  var formParser = bodyParser.urlencoded({extended: false});

  app.route('/')
    .get(function (req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app.route('/my')
    .get(isLoggedIn, function (req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app.route('/users/:id')
    .get(function (req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app.route('/login')
    .get(function (req, res) {
      res.sendFile(path + '/public/login.html');
    });

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/profile')
    .get(isLoggedIn, function (req, res) {
      res.sendFile(path + '/public/profile.html');
    });

  app.route('/api/me')
    .get(function (req, res) {
      if (req.isAuthenticated()) {
        res.json(req.user);
      } else {
        res.json(false);
      }
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.route('/api/images')
    .get(imageHandler.getAllImages)
    .post(isLoggedIn, formParser, imageHandler.createImage);

  app.route('/api/images/:id')
    .delete(isLoggedIn, imageHandler.deleteImage);

  app.route('/api/images/my')
    .get(isLoggedIn, function (req, res) {
      res.redirect('/api/images/users/' + req.user._id);
    });

  app.route('/api/images/users/:id')
    .get(imageHandler.getUserImages);
};
