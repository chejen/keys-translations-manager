[![NPM License][npm-license-image]][npm-license-url]
[![NPM Version][npm-version-image]][npm-version-url]

[npm-license-image]: https://img.shields.io/npm/l/keys-translations-manager-cli.svg
[npm-license-url]: https://www.npmjs.com/package/keys-translations-manager-cli
[npm-version-image]: https://img.shields.io/npm/v/keys-translations-manager-cli.svg
[npm-version-url]: https://www.npmjs.com/package/keys-translations-manager-cli

# keys-translations-manager-cli
> It's a cli tool that helps you download locales managed by [keys-translations-manager](https://github.com/chejen/keys-translations-manager).

* Older version: [v1.0.0](https://github.com/chejen/keys-translations-manager/blob/master/docs/cli-v1.0.md)


## Installation
Global installation:
```sh
$ npm install -g keys-translations-manager-cli
```

Local installation:
```sh
$ npm install --save-dev keys-translations-manager-cli
```

## Configuration
Add `.ktmrc` to your home directory (or add `.ktmrc` into your project if you installed the cli tool locally.)

* Sample `.ktmrc`:
```json
{
  "database": "mongodb://localhost:27017/translationdb",
  "outputs": [{
    "project": "p1",
    "locales": ["en-US", "zh-TW"],
    "type": "json",
    "filename": "${locale}",
    "path": "/path/to/project1",
    "formatted": true
  }, {
    "project": "p2",
    "locales": ["en-US", "zh-TW"],
    "type": "properties",
    "filename": "translation",
    "path": "/path/to/project2/${locale}"
  }]
}
```

| Properties | Description | Required |
|:----------:|:-----|:-----:|
| project    | Specify a project ID set in [ktm.config.js](https://github.com/chejen/keys-translations-manager/blob/master/ktm.config.js)| Y |
| locales    | Specify locales to output.| Y |
| type       | Specify one of the following: `json` (nested JSON), `flat` (flat JSON) or `properties`. | Y |
| filename   | Specify a name for output file. | Y |
| path       | Specify an output path. | Y |
| formatted  | Sort keys alphabetically. |

- `${locale}` can be a placeholder for **filename** and/or **path**.


## Usage
```
ktm <command>
```
<command> can be one of the following:
* `export`: Export locales to specified paths.
* `reset`: Drop the database used in KTM.


## Example
If you globally installed the cli tool, execute the command like this:
```sh
$ ktm export
```
Or, if you had it installed locally by your project, you can add `ktm` script to package.json's **scripts** property,
```js
"scripts": {
  "ktm": "ktm export"
}
```
then execute:
```sh
$ npm run ktm
```

Finally, you will get your outputs like these:
* /path/to/project1/en-US.json
* /path/to/project1/zh-TW.json
* /path/to/project2/en-US/translation.properties
* /path/to/project2/zh-TW/translation.properties
