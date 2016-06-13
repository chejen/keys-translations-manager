## Import Instructions

* Prerequisite: Prepare your locales to import (or you can get [locales](https://github.com/chejen/keys-translations-manager/tree/master/public/locale) from this project for a trial.)

* Step 1: Click the import button on the upper-right corner to open a popup.

![step1](https://cloud.githubusercontent.com/assets/14872888/15960940/c80d42c4-2f34-11e6-9008-169886f4c4ec.png)

* Step 2: Choose a file, select locale and project to import, then hit the '**Imort**' button to submit.

![step2](https://cloud.githubusercontent.com/assets/14872888/15959507/afda5b8a-2f2d-11e6-9ebc-07f52df61b5d.png)

> Only `*.json` or `*.properties` will be accepted by Keys-Translations Manager.

* Step 3: Let system check if the data imported is valid. If so, you will see the result like this:

![step3](https://cloud.githubusercontent.com/assets/14872888/15959509/afe8f136-2f2d-11e6-8ba9-655127b5f613.png)

> Keys-Translations Manager will help you validate your data, and here are 2 main principles: **(1)** The field `Key` is unique by {project + locale}. **(2)** If the key "ui.common.add" exists, "ui", "ui.common", and "ui.common.add.*" are all disallowed. Otherwise, it would cause JSON parsing errors.

* Step 4: Repeat step 1 to step 3 until all of your locales are imported.

![step4](https://cloud.githubusercontent.com/assets/14872888/15959508/afdee236-2f2d-11e6-8f20-11d7b74aa6ab.png)
