# **v1.2.0** ()

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
* Added a tip for inline editing on grid's header.
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
