/***
 * Excerpted from "Build Reactive Websites with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rkrxjs for more book information.
***/
'use strict';

function debounce(fn, delay=333) {
  let time;
  return function (...args) {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => fn(...args), delay);
  }
}

let f = debounce((num) => console.log('debounced!  Arg:', num));

// Call synchronously
f(1);
f(2);
f(3);
f(4);
f(5);

// Call several times in a short interval
let i = 0;
let interval = setInterval(() => {
  console.log(++i);
  f(i);
}, 100);

setTimeout(() => clearInterval(interval), 1000);
