/***
 * Excerpted from "Build Reactive Websites with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rkrxjs for more book information.
***/
'use strict';

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/creatingObservables', function (req, res, next) {
  res.render('creatingObservables', { title: 'Creating Observables' });
});

module.exports = router;
