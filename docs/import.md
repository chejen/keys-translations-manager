## Import Instructions

* Prerequisite: Prepare your locales to import (or you can get [locales](https://github.com/chejen/keys-translations-manager/tree/master/public/locale) from this project for a trial.)

* Step 1: Click the import button on the upper-right corner to open a popup.

![step1](https://user-images.githubusercontent.com/14872888/46032442-395f3f80-c12e-11e8-8263-1ebbf1abb221.png)

* Step 2: Choose a file, select locale and project to import, then hit the '**Imort**' button to submit.

![step2](https://cloud.githubusercontent.com/assets/14872888/17220530/46ca8988-5522-11e6-9e75-2405ad0dfb21.png)

> Only `*.json` or `*.properties` will be accepted by Keys-Translations Manager.

* Step 3: Let system check if the data imported is valid. If so, you will see the result like this:

![step3](https://user-images.githubusercontent.com/14872888/46030069-b76c1800-c127-11e8-86a4-fccc27b88d3c.png)

> Keys-Translations Manager will help you validate your data, and here are 2 main principles: **(1)** The field `Key` is unique by {project + locale}. **(2)** If the key "ui.common.add" exists, "ui", "ui.common", and "ui.common.add.*" are all disallowed. Otherwise, it would cause JSON parsing errors.

* Step 4: Repeat step 1 to step 3 until all of your locales are imported.

![step4](https://user-images.githubusercontent.com/14872888/46030067-b76c1800-c127-11e8-93d9-ea78f9e6e93f.png)
