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
let scanButton = document.querySelector('#scanButton');
let stopButton = document.querySelector('#stopButton');
let scanAlert = document.querySelector('#scanAlert');
let devicestbody = document.querySelector('#devicestbody');


// Attempt to run the experimental requestLEScan function
async function scanForAdvertisements() {
  try {
    const scan = await navigator.bluetooth.requestLEScan(SCAN_OPTIONS);
    let numberOfEvents = 0;
    scanButton.textContent = 'Scanning...';
    scanButton.setAttribute('class', 'btn btn-outline-dark');
    scanButton.setAttribute('disabled', true);
    stopButton.setAttribute('class', 'btn btn-primary');
    stopButton.removeAttribute('disabled');

    navigator.bluetooth.addEventListener('advertisementreceived', event => {
      handleScanEvent(event);
      numberOfEvents++;
    });

    function stopScan() {
      let stopTime = new Date().toLocaleTimeString();
      scan.stop();
      scanAlert.textContent = 'Scan stopped at ' + stopTime + ' with ' +
                              numberOfEvents + ' events detected.';
      scanAlert.removeAttribute('hidden');
      scanButton.textContent = 'Scan';
      scanButton.setAttribute('class', 'btn btn-primary mb-2');
      scanButton.removeAttribute('disabled');
      stopButton.setAttribute('class', 'btn btn-outline-dark mb-2');
      stopButton.setAttribute('disabled', true);
      stopButton.removeEventListener('click', stopScan);
    }

    stopButton.addEventListener('click', stopScan);
  }
  catch(error)  {
    scanAlert.textContent = 'Scan unsuccessful: ' + error;
    scanAlert.removeAttribute('hidden');
  }
}


// Handle a scan event
function handleScanEvent(event) {
  let deviceId = base64toHex(event.device.id);
  let tr = document.getElementById(deviceId);
  if(tr) {
    updateDevice(event, tr);
  }
  else {
    insertDevice(deviceId, event, true);
  }
  sortDevicesAndHighlight(deviceId);
}


// Insert a device into the DOM as a <tr>
function insertDevice(deviceId, event, prepend) {
  let tr = document.createElement('tr');
  tr.setAttribute('id', deviceId);
  tr.setAttribute('class', 'monospace');

  let compactDeviceId = deviceId.slice(0,4) + '\u2026' + deviceId.slice(-4);
  appendTd(tr, compactDeviceId, 'text-right');
  appendTd(tr, event.rssi, 'text-right');
  appendTd(tr, 1, 'text-center');
  appendTd(tr, new Date().toLocaleTimeString(), 'text-center');

  devicestbody.prepend(tr);
}


// Update an existing device in the DOM
function updateDevice(event, tr) {
  let tds = tr.getElementsByTagName('td');
  updateNode(tds[1], event.rssi);
  updateNode(tds[2], parseInt(tds[2].textContent) + 1);
  updateNode(tds[3], new Date().toLocaleTimeString());
}


// Append a <td> with the given content to the given <tr>
function appendTd(tr, content, classNames) {
  let td = document.createElement('td');
  updateNode(td, content);
  tr.appendChild(td);
  if(classNames) {
    td.setAttribute('class', classNames);
  }
}


// Update the given node with the given content
function updateNode(node, content, append) {
  append = append || false;

  while(!append && node.firstChild) {
    node.removeChild(node.firstChild);
  }

  if(content instanceof Element) {
    node.appendChild(content);
  }
  else if(content instanceof Array) {
    content.forEach(function(element) {
      node.appendChild(element);
    });
  }
  else {
    node.textContent = content;
  }
}


// Sort the devices in the table, highlighting the given deviceId
function sortDevicesAndHighlight(deviceId) {
  let trs = Array.from(devicestbody.getElementsByTagName('tr'));
  let sortedFragment = document.createDocumentFragment();
  let sortFunction = function(tr1, tr2) {
    if(parseInt(tr1.getElementsByTagName('td')[1].textContent) >
       parseInt(tr2.getElementsByTagName('td')[1].textContent)) {
      return -1;
    };
    return 1;
  };

  trs.sort(sortFunction);

  trs.forEach(function(tr) {
    if(tr.id === deviceId) {
      tr.setAttribute('class', 'monospace animated-highlight-reelyactive');
    }
    else {
      tr.setAttribute('class', 'monospace');
    }
    sortedFragment.appendChild(tr);
  });

  devicestbody.appendChild(sortedFragment);
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