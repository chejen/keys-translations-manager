[![MIT Licensed][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/chejen/keys-translations-manager/blob/master/LICENSE
[dependency-image]: https://david-dm.org/chejen/keys-translations-manager.svg
[dependency-url]: https://david-dm.org/chejen/keys-translations-manager
[travis-image]: https://img.shields.io/travis/chejen/keys-translations-manager.svg
[travis-url]: https://travis-ci.org/chejen/keys-translations-manager
[codecov-image]: https://codecov.io/github/chejen/keys-translations-manager/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/chejen/keys-translations-manager?branch=master


# Keys-Translations Manager

[Demo](#demo) |
[Prerequisites](#prerequisites) |
[Getting Started](#getting-started) |
[Custom](#custom) |
[CLI](#cli) |
[REST API](#rest-api) |
[Technologies](#technologies) |
[License](#license)

> This project offers a web application which aims to facilitate locale management. With this application, you can manage keys and their related translations. Also, you can download final locale files (either *.json or *.properties) through this application.


## Demo
![demo](https://cloud.githubusercontent.com/assets/14872888/13722929/33d4bd16-e890-11e5-87ea-8809f7a9f81d.gif)


## Prerequisites
* Download [Node.js](https://nodejs.org/en/) (suggestion: v5+) and [MongoDB](https://www.mongodb.org/), and then get them installed.
* Start [mongod](https://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/) process and make sure it's running normally.


## Getting Started
Checkout this repo (or directly download the stable releases from [here](https://github.com/chejen/keys-translations-manager/releases)), install dependencies, then start the web server:
```sh
$ git clone https://github.com/chejen/keys-translations-manager
$ cd keys-translations-manager
$ npm install
$ npm start
```
Open http://localhost:3000/ and enjoy it.


## Custom
There are some settings (in [ktm.config.js](./ktm.config.js)) you can configure. The table below lists the available ones:

| **Setting** | **Description** |**Default**|
|----------|-------|---|
|  server  |   Web server's hostname and port    | ```{ hostname: 'localhost', port: 3000 }```  |
|  database  |   MongoDB connection URI    | ```'mongodb://localhost:27017/translationdb'```  |
|  locales  |   The locales need to be managed. (You can add or remove locales arbitrarily.)    | ```['en-US', 'zh-TW']```  |
|  projects  |   The projects need to be localized. (You can add or remove projects arbitrarily.)    | ```[ {id:'p1', name:'project A'}, {id:'p2', name:'project B'} ]```  |

* Rebuild the code (```npm run build```) if you change the settings of **locales** or **projects**.
* Restart the server if you change any of these configurations.


## CLI
* Download locales without opening the web application. (See [keys-translations-manager-cli] [15] for more details)


## REST API
/api/download/{format}/{fileType}/{projectId}/{locale}

* Method:
  * GET

* Parameters:
  * `format`: replace it with **f** (formatted) or **n** (not formatted) 【Required】
  * `fileType`: replace it with **json** or **properties** 【Required】
  * `projectId`: replace it with the project ID set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js) 【Required】
  * `locale`: replace it with the locale set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js)

Example request URIs:

* GET http://localhost:3000/api/download/n/properties/p1
  * Download a ZIP file which contains all of the locales in project p1.

* GET http://localhost:3000/api/download/f/json/p1/en-US
  * Download a JSON file for en-US locale.


## Technologies
* Scaffolded with [MongoDB] [1], [Express] [2], [React] [3], and [Node.js] [4]
* Styled with [Bootstrap] [5] (theme: [SB Admin 2] [7]) and [Less] [6]
* Module Bundler: [webpack] [9]
* Unit Testing: [Mocha] [10], [Chai] [11] and [Enzyme] [12]
* Miscellaneous: [Babel] [13], [ESLint] [14]


## License
This source code is licensed under the [MIT License](http://www.opensource.org/licenses/MIT).

[1]: https://www.mongodb.org/
[2]: http://expressjs.com/
[3]: https://facebook.github.io/react/
[4]: https://nodejs.org/en/
[5]: http://getbootstrap.com/
[6]: http://lesscss.org/
[7]: http://startbootstrap.com/template-overviews/sb-admin-2/
[8]: http://formatjs.io/react/
[9]: https://webpack.github.io/
[10]: https://mochajs.org/
[11]: http://chaijs.com/
[12]: http://airbnb.io/enzyme/
[13]: https://babeljs.io/
[14]: http://eslint.org/
[15]: https://github.com/chejen/keys-translations-manager/tree/master/packages/keys-translations-manager-cli
