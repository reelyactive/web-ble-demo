angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.device = JSON.stringify({}, null, ' ');
    $scope.compatibilityError = 'None';
    $scope.scanError = 'None';
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;

    $scope.scan = function() {
      try {
        navigator.bluetooth.requestDevice({
          filters: [{
            //name: 'reelyActive'
            services: ['battery_service']
          }]
        })
        .then(device => {
          $scope.device.name = device.name;
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
          $scope.device.value = value.getUint8(0);
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

  });
