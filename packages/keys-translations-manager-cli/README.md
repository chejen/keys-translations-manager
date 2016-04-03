[![NPM License][npm-license-image]][npm-license-url]
[![NPM Version][npm-version-image]][npm-version-url]

[npm-license-image]: https://img.shields.io/npm/l/keys-translations-manager-cli.svg
[npm-license-url]: https://www.npmjs.com/package/keys-translations-manager-cli
[npm-version-image]: https://img.shields.io/npm/v/keys-translations-manager-cli.svg
[npm-version-url]: https://www.npmjs.com/package/keys-translations-manager-cli

# keys-translations-manager-cli
> It's a cli tool that helps you download locales managed by [keys-translations-manager](https://github.com/chejen/keys-translations-manager).


## Installation
It's recommended to install cli locally by your project.
```sh
$ npm install --save-dev keys-translations-manager-cli
```

## Configuration
Add `.ktmrc` to your project:

```json
{
  "database": "mongodb://localhost:27017/translationdb",
  "output": {
    "filename": "translation",
    "path": "./public/locale/${locale}"
  }
}
```
* `${locale}` can be a placeholder for both **filename** and **path**.


## Usage
ktm [locale1 (, locale2, ...)] -t [json | properties] -p [project ID]


## Options

| Option  | Shorthand  | Description | Required |
|:------------|:---------------:|:-----|:-----:|
| --type    | -t | Specify a file type. <br>(Please provide either `json` or `properties`) | Y |
| --project | -p | Specify a project to output locales. <br>(Please provide **a project ID**) | Y |
| --format  | -f | Sort keys alphabetically. |
| --help    | -h | Show help. |

* You have to map **project ID** to the setting of [ktm.config.js](../../ktm.config.js) (at [keys-translations-manager](https://github.com/chejen/keys-translations-manager)).


## Example
> Note that these instructions assume that you have the cli installed **locally**.

Add `ktm` script to package.json's "scripts" property.
```js
"scripts": {
  "ktm": "ktm en-US zh-TW -p p1 -t json --format"
}
```
Execute `npm run ktm`, and we will get outputs like these:
* public/locale/en-US/translation.json
* public/locale/zh-TW/translation.json
