'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('cfgram:gallery-router');

const Gallery = require('../model/gallery.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const gallerRouter = module.exports = Router();

gallerRouter.post('/api/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/gallery');

  req.body.userID = req.user._id;
  new Gallery(req.body).save()
    .then(gallery => res.json(gallery))
    .catch(next);
});

gallerRouter.get('/api/gallery/:galleryId', bearerAuth, function(req, res, next) {
  debug('GET: /api/gallery/:galleryId');

  Gallery.findById(req.params.galleryId)
    .then(gallery => res.json(gallery))
    .catch(next);
});