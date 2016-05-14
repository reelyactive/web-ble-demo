angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.result = null;
    $scope.nameFilter = 'reelyActive';
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;
    $scope.compatibilityError = null;
    $scope.scanError = null;

    $scope.scan = function() {
      try {
        navigator.bluetooth.requestDevice({
          filters: [{
            name: $scope.nameFilter,
            optionalServices: [ 'battery_service' ]
          }]
        })
        .then(device => {
          $scope.result = { id: device.id, name: device.name,
                            uuids: device.uuids, connected: device.connected };
          //return device.gatt.connect();
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

  });
