## REST API

#### /api/rest/{format}/{fileType}/{projectId}/{locale}

* Method:
  * GET

* Parameters:
  * `format`: replace it with **f** (formatted) or **n** (not formatted) 【Required】
  * `fileType`: replace it with **json** (nested JSON), **flat** (flat JSON) or **properties** 【Required】
  * `projectId`: replace it with the project ID set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js) 【Required】
  * `locale`: replace it with the locale set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js)

Example request URIs:

* GET http://localhost:3000/api/rest/n/properties/p1/zh-TW
  * Fetch zh-TW locale in Property format from project p1.

* GET http://localhost:3000/api/rest/f/json/p1/en-US
  * Fetch en-US locale with alphabetically sorted JSON from project p1.


#### /api/download/{format}/{fileType}/{projectId}/{locale}

* Method:
  * GET

* Parameters:
  * `format`: replace it with **f** (formatted) or **n** (not formatted) 【Required】
  * `fileType`: replace it with **json** (nested JSON), **flat** (flat JSON) or **properties** 【Required】
  * `projectId`: replace it with the project ID set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js) 【Required】
  * `locale`: replace it with the locale set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js)

Example request URIs:

* GET http://localhost:3000/api/download/n/properties/p1/zh-TW
  * Download a Property-formatted zh-TW locale from project p1.

* GET http://localhost:3000/api/download/f/json/p1/en-US
  * Download a JSON-formatted en-US locale from project p1.

* GET http://localhost:3000/api/download/n/properties/p1
  * Download a ZIP file containing all of the locales in project p1.
