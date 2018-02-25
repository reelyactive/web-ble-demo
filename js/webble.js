/**
 * Copyright reelyActive 2017-2018
 * We believe in an open Internet of Things
 */

angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;
    $scope.compatibilityError = null;
    $scope.scanCompleted = false;
    $scope.devices = [];

    // This is the best we can currently do: requestDevice()
    $scope.requestDevice = function() {
      $scope.result = null;    // Clear any
      $scope.device = null;    //   previous
      $scope.event = null;     //   values or
      $scope.scanError = null; //   errors
      $scope.compatibilityError = null;

      try {
        var deviceInfo = {};
        console.log('Starting to request BLE devices');
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true
        })
        .then(device => {
          deviceInfo.name = device.name;
          deviceInfo.id = device.id,
          $scope.device = JSON.stringify(deviceInfo, null, 2);
          console.log('User paired with device name:', device.name,
                      'id:', device.id);
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        console.log('Unable to complete requestDevice()');
        $scope.compatibilityError = err.toString();
      }
    }

    // This is how we want it to work: requestLEScan()
    $scope.requestScan = function() {
      $scope.scanError = null;          // Clear any previous
      $scope.compatibilityError = null; //   errors

      try {
        navigator.bluetooth.requestLEScan({
          filters: [],
          options: { keepRepeatedDevices: true, acceptAllAdvertisements: true }
        })
        .then(() => {
          $scope.scanCompleted = true;
          navigator.bluetooth.addEventListener('advertisementreceived', event => {
            let device = event;
            $scope.devices.push(device);
          });
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        console.log('Unable to complete requestLEScan()');
        $scope.compatibilityError = err.toString();
      }      
    }

    // Hack to periodically apply scope so variables update in browser
    setInterval(function() { $scope.$apply(); }, 1000);
  });
