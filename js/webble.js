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


// Other variables
let devices = {};


// Attempt to run the experimental requestLEScan function
async function scanForAdvertisements() {
  devices = {};
  eventJson.textContent = '';
  scanStatus.textContent = 'Initiating scan';

  try {
    const scan = await navigator.bluetooth.requestLEScan(SCAN_OPTIONS);
    let numberOfEvents = 0;

    scanStatus.textContent = 'Scan started: active = ' + scan.active;

    navigator.bluetooth.addEventListener('advertisementreceived', event => {
      devices[base64toHex(event.device.id)] = { rssi: event.rssi };
      eventJson.textContent = JSON.stringify(event, null, 2);
      numberOfEvents++;
    });

    function stopScan() {
      scan.stop();
      eventJson.textContent = JSON.stringify(devices, null, 2);
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


// Convert base64 to hexadecimal
function base64toHex(encodedValue) {
  let decodedValue = atob(encodedValue);
  let hexString = '';

  for(let cChar = 0; cChar < decodedValue.length; cChar++ ) {
    let hex = '0'+ decodedValue.charCodeAt(cChar).toString(16);
    hexString += hex.slice(-2);
  }

  return hexString;
}


// Handle scan button click
scanButton.addEventListener('click', scanForAdvertisements);