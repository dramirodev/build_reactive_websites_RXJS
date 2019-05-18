/***
 * Excerpted from "Build Reactive Websites with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/rkrxjs for more book information.
***/
'use strict';

process.env.UV_THREADPOOL_SIZE = 100;

let path = require('path');
let webpack = require('webpack');
let execSync = require('child_process').execSync;

let loaders = [
  { test: /\.ts$/, loader: 'ts-loader' }
];

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: './index.ts'
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  }
};
