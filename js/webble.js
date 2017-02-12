angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.result = null;
    $scope.nameFilter = 'reelyActive';
    $scope.device = null;
    $scope.event = null;
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;
    $scope.compatibilityError = null;
    $scope.scanError = null;

    $scope.scan = function() {
      try {
        console.log('Giving it a try');
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [ 0x2a23, 'battery_service' ]
        })
        .then(device => {
          console.log('Device: ' + device);
          device.addEventListener('gattserverdisconnected', onDisconnected);
          $scope.device = device;
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
          $scope.result = value || 'Received null value';
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

  });
