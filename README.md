[![MIT Licensed][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![Build Status (Linux)][travis-image]][travis-url]
[![Build Status (Windows)][appveyor-image]][appveyor-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]
[![Coverage Status][codecov-image]][codecov-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/chejen/keys-translations-manager/blob/master/LICENSE
[dependency-image]: https://david-dm.org/chejen/keys-translations-manager.svg
[dependency-url]: https://david-dm.org/chejen/keys-translations-manager
[travis-image]: https://img.shields.io/travis/chejen/keys-translations-manager/master.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSItMTQyLjUgLTE0Mi41IDI4NSAyODUiPjxjaXJjbGUgcj0iMTQxLjciIGZpbGw9IiNERDQ4MTQiLz48ZyBpZD0iYSIgZmlsbD0iI0ZGRiI%2BPGNpcmNsZSBjeD0iLTk2LjQiIHI9IjE4LjkiLz48cGF0aCBkPSJNLTQ1LjYgNjguNGMtMTYuNi0xMS0yOS0yOC0zNC00Ny44IDYtNSA5LjgtMTIuMyA5LjgtMjAuNnMtMy44LTE1LjctOS44LTIwLjZjNS0xOS44IDE3LjQtMzYuNyAzNC00Ny44bDEzLjggMjMuMkMtNDYtMzUuMi01NS4zLTE4LjctNTUuMyAwYzAgMTguNyA5LjMgMzUuMiAyMy41IDQ1LjJ6Ii8%2BPC9nPjx1c2UgeGxpbms6aHJlZj0iI2EiIHRyYW5zZm9ybT0icm90YXRlKDEyMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSgyNDApIi8%2BPC9zdmc%2B
[travis-url]: https://travis-ci.org/chejen/keys-translations-manager
[appveyor-image]: https://img.shields.io/appveyor/ci/chejen/keys-translations-manager/master.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZyBmaWxsPSIjMUJBMUUyIiB0cmFuc2Zvcm09InNjYWxlKDgpIj48cGF0aCBkPSJNMCAyLjI2NWw2LjUzOS0uODg4LjAwMyA2LjI4OC02LjUzNi4wMzd6Ii8%2BPHBhdGggZD0iTTYuNTM2IDguMzlsLjAwNSA2LjI5My02LjUzNi0uODk2di01LjQ0eiIvPjxwYXRoIGQ9Ik03LjMyOCAxLjI2MWw4LjY3LTEuMjYxdjcuNTg1bC04LjY3LjA2OXoiLz48cGF0aCBkPSJNMTYgOC40NDlsLS4wMDIgNy41NTEtOC42Ny0xLjIyLS4wMTItNi4zNDV6Ii8%2BPC9nPjwvc3ZnPg==
[appveyor-url]: https://ci.appveyor.com/project/chejen/keys-translations-manager
[npm-downloads-image]: https://img.shields.io/npm/dt/keys-translations-manager-core.svg
[npm-downloads-url]: https://www.npmjs.com/package/keys-translations-manager-core
[codecov-image]: https://codecov.io/github/chejen/keys-translations-manager/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/chejen/keys-translations-manager?branch=master


# Keys-Translations Manager

[Demo](#demo) |
[Prerequisites](#prerequisites) |
[Getting Started](#getting-started) |
[Custom](#custom) |
[Import](#import) |
[Export](#export) |
[Technologies](#technologies) |
[Roadmap](#roadmap) |
[License](#license) |
[Questions?](#questions)

> Keys-Translations Manager, a web application scaffolded with MERN stack, aims to facilitate locale management. With this application, you can:
> * control and manage locales in one place,
> * import locales from JSON or Properties files,
> * export locales to JSON or Properties files,
> * get data validation for input/import, and
> * get real-time notifications if data is changed by the other users.


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

* Rebuild the code (```npm run build```) and restart the server if you change any of these configurations.


## Import
Transfer your locales from separate files to Keys-Translations Manager to make them easy to read, convenient to collaborate, and maintainable. (See [instructions] [16])


## Export
Not only can you download locales directly from the web, but you can also get them via [CLI] [15] or [REST API] [17].


## Technologies
* Scaffolded with [MongoDB] [1], [Express] [2], [React] [3], and [Node.js] [4]
* Styled with [Bootstrap] [5] (theme: [SB Admin 2] [7]) and [Less] [6]
* Module Bundler: [webpack] [9]
* Unit Testing: [Mocha] [10], [Chai] [11] and [Enzyme] [12]
* Miscellaneous: [Babel] [13], [ESLint] [14]


## Roadmap
* Add **MERGE** functionality to merge the same keys which are in different projects but have the same translations for every locale.
* Data visualization


## License
This source code is licensed under the [MIT License](http://www.opensource.org/licenses/MIT).


## Questions?
Please don't hesitate to [open an issue](https://github.com/chejen/keys-translations-manager/issues/new) or [contact me](mailto:jkopre.qek@gmail.com).


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
[16]: https://github.com/chejen/keys-translations-manager/blob/master/docs/import.md
[17]: https://github.com/chejen/keys-translations-manager/blob/master/docs/rest-api.md
