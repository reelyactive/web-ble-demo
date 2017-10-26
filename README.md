web-ble-demo
============

Step 1: Enable Web Bluetooth in Chrome
--------------------------------------

Enter __chrome://flags/#enable-experimental-web-platform-features__ in the Chrome browser and select Enable, if permitted.


Step 2: Load the web demo over HTTPS
------------------------------------

[Click here](https://reelyactive.github.io/web-ble-demo/) to load the web demo over HTTPS, and then press the Scan button.


Impressed?
----------

You shouldn't be.  Sadly the current implementation of Web Bluetooth does not include __navigator.bluetooth.requestLEScan()__ which would provide access to all the pertinent identifiers of nearbly devices.  At present, all that is exposed are the device _name_ and an _id_ with no relevance to the device metadata.

Fortunately, the [What's Next](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web#whats_next) from Google suggests that __navigator.bluetooth.requestLEScan()__ will be available in the near future.  Check back here for awesomeness when that is _finally_ availaBLE.


Something cool for the interim...
---------------------------------

Enter __chrome://bluetooth-internals#devices__ in the Chrome browser.  Imagine having access to all that info from a webpage!


More info
---------

See [Interact with BLE devices on the web](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web) for details.


License
-------

MIT License

Copyright (c) 2016-2017 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
