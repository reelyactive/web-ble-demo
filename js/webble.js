angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.device = JSON.stringify({}, null, ' ');
    $scope.compatibilityError = 'None';
    $scope.scanError = 'None';

    $scope.scan = function() {
      try {
        navigator.bluetooth.requestDevice({
          filters: [{
            name: 'reelyActive'
          }]
        })
        .then(device => {
          $scope.device.name = device.name;
          $scope.device.uuids = device.uuids;
          return device.gatt.connect();
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

  });
