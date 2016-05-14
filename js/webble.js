angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.result = {};
    $scope.compatibilityError = 'None';
    $scope.scanError = 'None';
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;

    $scope.scan = function() {
      $scope.result.scan = true;
      try {
        navigator.bluetooth.requestDevice({
          filters: [{
            name: 'reelyActive'
            //services: ['battery_service']
          }]
        })
        .then(device => {
          $scope.result.device = device;
          $scope.result.keys = Object.keys(device);
          $scope.result.name = device.name;
          $scope.result.uuids = device.uuids;
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
          $scope.result.value = value.getUint8(0);
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

  });
