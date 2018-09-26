# **v1.5.0** (Sep 27, 2018)

### BREAKING CHANGES:
* Alter a couple of custom settings (Set ```PORT``` and ```DB``` via environment variables instead of the file ktm.config.js).

### Features:
* Take **Docker Compose** as an alternative local development tool.
* Make the 'Key' field editable.
* Added the functionality to view detailed revision history of every single key and their tranlations.

### Other Changes:
* Dropped parts of React lifecycles that are about to be deprecated.
* Replaced react-bootstrap-table to get better performance.
* Integrated with **Heroku** to automatically build and release.


# **v1.4.1** (Oct 21, 2017)

* Upgraded React to 16 and updated all of the dependencies and devDependencies.


# **v1.4.0** (May 7, 2017)

### BREAKING CHANGES:
* Node v6+ is now required.

### Features:
* Support flat JSON output. ([691031f](https://github.com/chejen/keys-translations-manager/commit/691031fee3415f8c52754666b780a5145bbe6bea))
* Support CSV export. ([bdbaaa4](https://github.com/chejen/keys-translations-manager/commit/bdbaaa4c391e79c8bed8f802d55a8c8becfa0d9e))

### Docs:
* Updated CLI documentation for flat JSON support.

### Tests:
* Added flat JSON related tests.

### Other Changes:
* Environment:
  * Extracted a number of modules to vendor chunk for production build.
  * Added pre-commit hook for git.
  * Added yarn.lock

* Dependencies:
  * Upgraded react-router to v4. ([de05a58](https://github.com/chejen/keys-translations-manager/commit/de05a5849239d83235a21cdfcabd13b6015de8ae)) ([17ba890](https://github.com/chejen/keys-translations-manager/commit/17ba8908ad70b0e9df74a8d27c1042227489bca7))
  * Upgraded webpack to v2. ([2ac53df](https://github.com/chejen/keys-translations-manager/commit/2ac53dfa5be71f4b08c179a1a359302269060b82)) ([c34118b](https://github.com/chejen/keys-translations-manager/commit/c34118b6e350c1d56228603d76a7196c7cf948e3))
  * Upgraded D3 to v4. ([610901c](https://github.com/chejen/keys-translations-manager/commit/610901c4e476d0dde3ea5d9616d1bfe3ea187768)) ([7a9f30d](https://github.com/chejen/keys-translations-manager/commit/7a9f30ddccc46bc2cde05d578047d350d5914d4c))

* Components:
  * Truncated overflowed header of CountCol with ellipsis
  * Set the default of projects on FormPanel to not selected.


# **v1.3.0** (Jul 31, 2016)

### Features:
* Applied data visualization for keys and translations.
* Used **react-router** for location transition handling and code splitting.
* Replaced **ag-grid** with **react-bootstrap-table** to better support server-side rendering.

### Docs:
* Added visualization demonstration.

### Tests:
* Added tests for Mask, grid-related, and visualization-related components.
* Added tests for new utilities.

### Other Changes:
* Added a loading mask.
* Changed the style of search bar.
* Refactored some components and controllers.


# **v1.2.0** (Jun 13, 2016)

### Features:
- Added merge functionality.
- Added real-time notifications.
  - Notifications can be turned off from ktm.config.js
- Upgraded CLI to support multi-project exports.

### Docs:
* Added merge instructions.
* Updated CLI documentation.
* Moved the usage of Rest API from README.md to docs/.

### Tests:
* Added tests for merge functionality and real-time notifications.

### Other Changes:
* Updated animated demo gif.
* Updated the tip for inline editing on grid's header.
* Fixed an error of import validation.


# **v1.1.0** (Jun 2, 2016)

### Features:
* Added import functionality and validation.
  - JSON and Properties are both supported.
* Upgraded `react-bootstrap` to v0.29.x and fixed some deprecation warnings.

### Docs:
* Added import instructions.

### Other Changes:
* Added description field. ([@alampros](https://github.com/alampros) in [#3](https://github.com/chejen/keys-translations-manager/pull/3))
* Added [REST API](https://github.com/chejen/keys-translations-manager/blob/master/docs/rest-api.md) to README. ([#1](https://github.com/chejen/keys-translations-manager/issues/1))
* Added CHANGELOG.md


# **v1.0** (Apr 12, 2016)

### Features:
* Made web application universal (except [ag-grid](https://github.com/ceolter/ag-grid/issues/699)).
* Used `compression` middleware for gzip compression.

### Tests:
* Employed `enzyme` and `react-addons-test-utils` to test React components.
* Added tests for src/components/**

### Other Changes:
* Reorganized file and folder structure.
* Data validation enhancement.


# **v0.3.0** (Apr 3, 2016)

### Features:
- Added 2 packages:
  - [keys-translations-manager-core](https://github.com/chejen/keys-translations-manager/tree/master/packages/keys-translations-manager-core) (some utilities)
  - [keys-translations-manager-cli](https://github.com/chejen/keys-translations-manager/tree/master/packages/keys-translations-manager-cli) (a command line tool)
- Added favicon.

### Tests:
* Added tests for src/actions/** and src/reducers/**.
* Added tests for utilities at keys-translations-manager-core.
* Integrated with code coverage tools

### Other Changes:
* Refactored React components to ES6 classes.
* Switched main Flux solution from **Reflux** to **Redux**.
* Added propTypes for props validation.


# **v0.2.0** (Mar 12, 2016)

### Features:
* Added RWD support.
* Added internationalization support.
* Replaced **XMLHttpRequest** with **fetch**.

### Other Changes:
* Used **context** to pass configs through the component tree.


# **v0.1.0** (Feb 29, 2016)

### Features:
* Scaffolded the project with MERN stack.
* Added basic operations for keys and their translations.
* Added some data input validation.
