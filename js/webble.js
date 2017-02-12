angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;
    $scope.compatibilityError = null;

    $scope.scan = function() {
      $scope.result = null;    // Clear any
      $scope.device = null;    //   previous
      $scope.event = null;     //   values or
      $scope.scanError = null; //   errors

      try {
        console.log('Giving it a try');
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [ 0x2a23, 'battery_service' ]
        })
        .then(device => {
          var deviceInfo = {
            name: device.name,
            id: device.id,
            allowedServices: device.allowedServices
          };
          $scope.device = JSON.stringify(deviceInfo, null, 2);
          console.log('Device: ' + device);
          device.addEventListener('gattserverdisconnected', onDisconnected);
          return device.gatt.connect();
        })
        .then(server => {
          console.log('Connected');
          return server.getPrimaryService('battery_service');
        })
        .then(service => {
          console.log('Got service');
          return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
          console.log('Got characteristic');
          return characteristic.readValue();
        })
        .then(value => {
          $scope.result = { byte: value.getUint8(0) };
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        console.log('Unable to give it a try');
        $scope.compatibilityError = err.toString();
      }
    }

    // Disconnection
    function onDisconnected(event) {
      console.log('Event: Disconnected');
      $scope.event = event || 'Disconnected';
    }

    // Hack to periodically apply scope so variables update in browser
    setInterval(function() { $scope.$apply(); }, 1000);
  });
