## Import Instructions

* Prerequisite: Prepare your locales to import (or you can get [locales](https://github.com/chejen/keys-translations-manager/tree/master/public/locale) from this project for a trial.)

* Step 1: Click the import button on the upper-right corner to open a popup.

![step1](https://cloud.githubusercontent.com/assets/14872888/17220529/46c6645c-5522-11e6-8c62-c0ada35c349d.png)

* Step 2: Choose a file, select locale and project to import, then hit the '**Imort**' button to submit.

![step2](https://cloud.githubusercontent.com/assets/14872888/17220530/46ca8988-5522-11e6-9e75-2405ad0dfb21.png)

> Only `*.json` or `*.properties` will be accepted by Keys-Translations Manager.

* Step 3: Let system check if the data imported is valid. If so, you will see the result like this:

![step3](https://cloud.githubusercontent.com/assets/14872888/17220532/46cf33de-5522-11e6-8407-ba2a989ccadf.png)

> Keys-Translations Manager will help you validate your data, and here are 2 main principles: **(1)** The field `Key` is unique by {project + locale}. **(2)** If the key "ui.common.add" exists, "ui", "ui.common", and "ui.common.add.*" are all disallowed. Otherwise, it would cause JSON parsing errors.

* Step 4: Repeat step 1 to step 3 until all of your locales are imported.

![step4](https://cloud.githubusercontent.com/assets/14872888/17220536/46e9a0fc-5522-11e6-8639-4b85e23cf3e5.png)
