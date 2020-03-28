web-ble-demo
============

As of the release of Google Chrome 79 in late 2019, [the experimental Web Bluetooth Scanning feature is finally available](https://www.chromestatus.com/feature/5346724402954240)!


![reelyActive Web BLE Demo header](https://reelyactive.github.io/web-ble-demo/images/header.jpg)


Step 1: Enable Web Bluetooth in Chrome
--------------------------------------

Enter __chrome://flags/#enable-experimental-web-platform-features__ in the Chrome browser and select Enable, if permitted.  We also have a tutorial [here](https://reelyactive.github.io/pareto-anywhere/enable-web-bluetooth-scanning/).


Step 2: Load the web demo over HTTPS
------------------------------------

Browse to [reelyactive.github.io/web-ble-demo/](https://reelyactive.github.io/web-ble-demo/) to load the web demo over HTTPS, and then press the Scan button.

Alternatively, browse to [reelyactive.github.io/pareto-anywhere/](https://reelyactive.github.io/pareto-anywhere/) for the web app version of [Pareto Anywhere](https://getpareto.com) which is made possible by the Web Bluetooth Scanning feature.


Chrome has an internal scanning test feature
--------------------------------------------

Enter __chrome://bluetooth-internals#devices__ in the Chrome browser to confirm that your browser/platform is able to scan for advertising BLE devices.


More info
---------

See [Interact with BLE devices on the web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) for details.


License
-------

MIT License

Copyright (c) 2016-2020 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
