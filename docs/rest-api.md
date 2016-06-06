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
