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
            name: 'reelyActive',
            optionalServices: [0x2a23]
          }]
        })
        .then(device => {
          $scope.result.name = device.name;
          $scope.result.uuids = device.uuids;
          $scope.result.device = device;
          return device.gatt.connect();
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

  });
