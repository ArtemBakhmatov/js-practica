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

  module: {                       // Модули
    rules: [                      // правила (ввиде массива, внутри объект)
      {
        test: /\.m?js$/,          // js-ные файлы
        exclude: /(node_modules|bower_components)/, // какие файлы мы должны исключить
        use: {                    // как и что мы будем использовать
          loader: 'babel-loader', // установленная программа через npm
          options: {              // опции
            presets: [['@babel/preset-env', { // пресеты // установеленная через npm // 
                //debug: true,                  // видеть ошибки
                //corejs: 3,                    // устанавливае полифиллы  
                //useBuiltIns: "usage"          // выбираем те полифиллы которые нам нужны
            }]]
          }
        }
      }
    ]
  }
};

// установка webpack:
// 1) npm install -D webpack-cli

// запуск:
// 1) npx webpack

//babel: 
//1) npm install --save-dev @babel/preset-env
//2) npm i --save-dev babel-loader
//3) npm i --save-dev core-js (необязательно)
