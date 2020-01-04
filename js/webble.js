/**
 * Copyright reelyActive 2017-2020
 * We believe in an open Internet of Things
 */


// Constant definitions
const SCAN_OPTIONS = {
    acceptAllAdvertisements: true,
    keepRepeatedDevices: true
};


// DOM elements
let eventJson = document.querySelector('#eventJson');
let scanStatus = document.querySelector('#scanStatus');


// Attempt to run the experimental requestLEScan function
async function scanForAdvertisements() {
  try {
    const scan = await navigator.bluetooth.requestLEScan(SCAN_OPTIONS);
    let numberOfEvents = 0;

    scanStatus.textContent = 'Scan started: active = ' + scan.active;

    navigator.bluetooth.addEventListener('advertisementreceived', event => {
      eventJson.textContent = JSON.stringify(event, null, 2);
      numberOfEvents++;
    });

    function stopScan() {
      scan.stop();
      scanStatus.textContent = 'Scan stopped.  ' + numberOfEvents +
                               ' events detected.';
      stopButton.removeEventListener('click', stopScan);
    }

    stopButton.addEventListener('click', stopScan);
  }
  catch(error)  {
    scanStatus.textContent = 'Scan unsuccessful: ' + error;
  }
}


// Handle scan button click
scanButton.addEventListener('click', scanForAdvertisements);