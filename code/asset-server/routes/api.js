/***
 * Excerpted from "Build Reactive Websites with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rkrxjs for more book information.
***/
let express = require('express');
let fetch = require('node-fetch');
let router = express.Router();
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

// This route deliberately 404's
// router.get('/managingAsync/ajaxExample', function (req, res, next) {
//   throw new Error('Argh!');
// });

router.get('/managingAsync/correctAjaxExample', function (req, res, next) {
  res.send('It worked!');
});

router.get('/managingAsync/assets/bad/:id', function (req, res, next) {
  let id = Number(req.params.id);
  // ensure an error always happens
  if (id === 72) {
    throw new Error('Something went wrong');
  }
  // some more random errors
  if (Math.random() * 1000 < id) {
    throw new Error('Something went wrong');
  }
  setTimeout(() => res.send('Hello'), 250);
});

router.get('/managingAsync/loadingbar/:id', function (req, res, next) {
  let wait = Math.floor(Math.random() * 350) + 250;
  setTimeout(() => res.send('ok'), wait);
});

router.get('/managingAsync/assets/:id', function (req, res, next) {
  let wait = Math.floor(Math.random() * 350) + 250;
  setTimeout(() =>
    res.sendFile(process.cwd() + '/public/managingAsync/assets/' + req.params.id),
    wait);
});

router.all('/reactiveForms/usernameCheck/:username', function (req, res, next) {
  if (['rkoutnik', 'taken', 'anotheruser'].includes(req.params.username)) {
    return res.json({taken: true});
  }
  return res.json({ taken: false });
});

router.all('/reactiveForms/addressCheck/:username', function (req, res, next) {
  return res.json({
    validAddress: true
  });
});

router.all('/reactiveForms/user/save', function (req, res, next) {
  return res.json({
    success: true
  });
});

router.get('/advancedAsync/stackoverflow/:query', function (req, res, next) {
  let endpoint = `https://api.stackexchange.com/2.2/search?site=stackoverflow&order=desc&sort=activity&filter=default&intitle=`
  fetch(endpoint + req.params.query)
  .then(fetchResponse => fetchResponse.json())
  .then(fetchResponse => res.json(fetchResponse.items))
  .catch(next);
});

router.get('/multiplexingObservables/chat/user/:username', function (req, res, next) {
  setTimeout(() => {
    return res.json({
      username: req.params.username,
      id: 12345,
      rooms: [{
        id: 0,
        name: 'RxJS'
      }, {
        id: 1,
        name: 'JavaScript'
      }, {
        id: 2,
        name: 'Programming'
      }, {
        id: 3,
        name: 'Off topic'
      }]
    });
  }, 2000);
});

let googImgUrl = 'http://images.google.com/search?tbm=isch&q=';

router.get('/ng2Ajax/imgSearch/:query', function (req, res, next) {
  new Promise((resolve, reject) => {
    request(googImgUrl + req.params.query, function (error, response, body) {
      if (error) { return reject(error); }
      if (!body) { return reject('No Body'); }
      let $ = cheerio.load(body);
      let urls = [];
      $('#res img').map((idx, el) => urls[idx] = $(el).attr('src'));
      resolve(urls);
    });
  })
  .then(urls => {
    res.json(urls);
  })
  .catch(err => {
    res.json([
      'http://localhost:3000/images/cat0.jpg',
      'http://localhost:3000/images/cat1.jpg',
      'http://localhost:3000/images/cat2.jpg',
      'http://localhost:3000/images/cat3.jpg',
      'http://localhost:3000/images/cat4.jpg',
      'http://localhost:3000/images/cat5.jpg',
      'http://localhost:3000/images/cat6.jpg']);
  });
});

let savedPhotos = [];
try {
  savedPhotos = require('../photos.json');
} catch (e) { /* file does not exist, default to empty array */ }

router.get('/ng2ajax/getSinglePhoto/:id', function(req, res, next) {
  let id = Number(req.params.id);
  let photo = savedPhotos.find(p => p.id === id);
  if (!photo) {
    return res.statusCode(404);
  }
  return res.json(photo);
});
router.get('/ng2ajax/savedPhotos', function(req, res, next) {
  return res.json(savedPhotos);
});
router.post('/ng2ajax/addNewPhoto', function (req, res, next) {
  let alreadySaved = savedPhotos.find(saved => saved.url === req.body.url);
  if (alreadySaved) {
    console.log('already saved', alreadySaved);
    return res.json(alreadySaved);
  }
  let entry = {
    id: savedPhotos.length,
    url: req.body.url,
    tags: []
  };
  savedPhotos.push(entry);
  res.json(entry);
});
router.put('/ng2ajax/updatePhoto', function(req, res, next) {
  let idx = savedPhotos.findIndex(photo => photo.id === req.body.id);
  if (idx === -1) {
    return next('Could not find photo with id ' + photo.id);
  }
  let updatedPhoto = {
    id: req.body.id,
    url: req.body.url || savedPhotos[idx].url,
    tags: req.body.tags || []
  };
  savedPhotos[idx] = updatedPhoto;
  res.json(req.body);
});

function saveSavedPhotos() {
  fs.writeFileSync('./photos.json', JSON.stringify(savedPhotos), 'utf8');
}

// https://stackoverflow.com/a/14032965/1216976
process.on('exit', saveSavedPhotos);

module.exports = router;
