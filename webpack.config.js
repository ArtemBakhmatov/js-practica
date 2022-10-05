'use strict';

let path = require('path');

module.exports = {
  mode: 'development',            // режим 'разработка'
  entry: './src/js/script.js',    // откуда собираем 
  output: {
    filename: 'bundle.js',        // создается новый файл
    path: __dirname + '/src/js'   // куда 
  },
  watch: true,                    // отслеживание при каждом изменений 

  devtool: "source-map",          // карта 

  module: {}
};

// установка:
// 1) npm install -D webpack-cli

// запуск:
// 1) npx webpack
