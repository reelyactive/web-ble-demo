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
          optionalServices: [ 0x2a23 ]
        })
        .then(device => {
          device.addEventListener('gattserverdisconnected', onDisconnected);
          $scope.device = device;
          return device.gatt.connect();
        })
        .then(server => {
          return server.getPrimaryService(0x2a23);
        })
        .then(service => {
          return service.getCharacteristic(0x2a23);
        })
        .then(characteristic => {
          return characteristic.readValue();
        })
        .then(value => {
          $scope.result = value;
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

    // Disconnection
    function onDisconnected(event) {
      $scope.event = event;
    }

  });
