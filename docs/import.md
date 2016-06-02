## Import Instructions

* Prerequisite: Prepare your locales to import (or you can get [locales](https://github.com/chejen/keys-translations-manager/tree/master/public/locale) from this project for a trial.)

* Step 1: Click the import button on the upper-right corner to open a popup.

![step1](https://cloud.githubusercontent.com/assets/14872888/15715061/aabc8a86-284f-11e6-88f1-4d7bcf19a52f.png)

* Step 2: Choose a file, select locale and project to import, then hit the imort button to submit.

![step2](https://cloud.githubusercontent.com/assets/14872888/15712844/7a88a61e-2846-11e6-9204-24e1b01ffd68.png)

> Only `*.json` or `*.properties` will be accepted by Keys-Translations Manager.

* Step 3: Let system check if the data imported is valid. If so, you will see the result like this:

![step3](https://cloud.githubusercontent.com/assets/14872888/15712846/7a8d0d80-2846-11e6-983a-8ddf0b033117.png)

> Keys-Translations Manager will help you validate your data, and here are 2 main principles:
> 1. The field `Key` is unique by {locale + project}.
> 2. If the key "ui.common.add" exists, "ui", "ui.common", and "ui.common.add.*" are all disallowed. Otherwise, it would cause JSON parsing errors.

* Step 4: Repeat step 1 to step 3 until all of your locales are imported.

![step4](https://cloud.githubusercontent.com/assets/14872888/15712845/7a8be41e-2846-11e6-9a74-e1dc744a9107.png)
