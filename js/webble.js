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


// Attempt to run the experimental requestLEScan function
async function scanForAdvertisements() {
  try {
    const scan = await navigator.bluetooth.requestLEScan(SCAN_OPTIONS);
    let numberOfEvents = 0;

    navigator.bluetooth.addEventListener('advertisementreceived', event => {
      eventJson.textContent = JSON.stringify(event, null, 2);
      numberOfEvents++;
    });

    function stopScan() {
      scan.stop();
      console.log('Scan stopped.', numberOfEvents, 'events detected.');
      stopButton.removeEventListener('click', stopScan);
    }

    stopButton.addEventListener('click', stopScan);
  }
  catch(error)  {
    console.log('Scan unsuccessful:', error);
  }
}


// Handle scan button click
scanButton.addEventListener('click', scanForAdvertisements);