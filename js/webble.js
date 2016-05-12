angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.device = JSON.stringify({}, null, ' ');
    $scope.scanCount = 0;

    $scope.scan = function() {
      $scope.scanCount++;
      try {
        navigator.bluetooth.requestDevice({
          filters: [{
            name: 'reelyActive'
          }]
        })
        .then(device => { $scope.device = JSON.stringify(device, null, ' ');
                          return device.gatt.connect(); })
        .catch(error => { $scope.device = { error: error.toString() }; });
      }
      catch(err) {
        $scope.device = { err: err.toString() };
      }
    }

  });
