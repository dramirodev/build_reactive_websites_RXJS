/***
 * Excerpted from "Build Reactive Websites with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rkrxjs for more book information.
***/
let url = require('url');
let WebSocket = require('ws');
let loremIpsum = require('lorem-ipsum');

let rooms = [{
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
}];

let otherUsers = ['Bill', 'Diane', 'Dave', 'Louise', 'Jen', 'Gorblax_teh_destroyer'];
function randFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Prevent accidental non-JSON or sending to a closed websocket
function safeSend(req, ws, data) {
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  if (req.client.readyState === 'open') {
    ws.send(data);
  }
}

// Chat room from multiplexingObservables
function runChatRoom(req, ws) {
  console.log('-- init chat room --');
  // Wait for "user has connected" message
  ws.on('message', msg => {
    msg = JSON.parse(msg);
    msg.room = rooms.find(r => r.name === msg.room);
    msg.user = msg.user.username;
    // reply back so it gets rendered to page
    console.log('got a message', msg);
    safeSend(req, ws, msg);
  });
  // Send lorum ipsum messages at random intervals
  function sendRandomMessage() {
    let room = randFromArr(rooms);
    safeSend(req, ws, {
      room,
      message: loremIpsum(),
      user: randFromArr(otherUsers),
      type: 'message'
    });
    setTimeout(sendRandomMessage, Math.random() * 300);
  }
  sendRandomMessage();
}

// Stock market
function runStockMarket(req, ws) {
  let stocks = [
    { label: 'ABC', price: 12.34 },
    { label: 'DEF', price: 10.87 },
    { label: 'GHI', price: 11.44 },
    { label: 'JKL', price: 9.34 }
  ];
  function setAndSend() {
    // a Math.random() walk down Wall st
    stocks = stocks.map(s => {
      if (Math.random() > 0.5) {
        s.price = s.price + Math.random();
      } else {
        s.price = s.price - Math.random();
      }
      // Rounding
      s.price = (s.price * 100) | 0;
      s.price = s.price / 100;
      return s;
    });
    safeSend(req, ws, stocks);
  }
  setInterval(setAndSend, 1000);
  setAndSend();
}
module.exports = function (server) {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function connection(ws, req) {
    console.log('req.url ========', req.url);
    if (req.url === '/api/multiplexingObservables/chat-ws') {
      runChatRoom(req, ws);
    } else {
      runStockMarket(req, ws);
    }
  });
};
