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
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [ 0x2a23, 'battery_service' ]
        })
        .then(device => {
          device.addEventListener('gattserverdisconnected', onDisconnected);
          $scope.$apply(function () {
            $scope.device = device;
          }
          return device.gatt.connect();
        })
        .then(server => {
          return server.getPrimaryService('battery_service');
        })
        .then(service => {
          return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
          return characteristic.readValue();
        })
        .then(value => {
          $scope.result = value || 'Received null value';
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

    // Disconnection
    function onDisconnected(event) {
      $scope.event = event || 'Disconnected';
    }

  });
