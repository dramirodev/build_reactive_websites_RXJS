/***
 * Excerpted from "Build Reactive Websites with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rkrxjs for more book information.
***/
let express = require('express');
let router = express.Router();

router.post('/reactiveForms/registration', function (req, res, next) {
  return res.send(200);
});

// Addresses & CC data for the dropdowns
router.get('/reactiveForms/userData/addresses', function (req, res, next) {
  res.json([
    '123 Anywhere St.',
    '555 Reactive Row'
  ]);
});
router.get('/reactiveForms/userData/creditCards', function (req, res, next) {
  res.json([
    '1234 MasterCard',
    '5678 Visa'
  ]);
});

module.exports = router;
