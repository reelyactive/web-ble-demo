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
            name: $scope.nameFilter
          }]
        })
        .then(device => {
          $scope.result = { name: device.name, uuids: device.uuids };
          return device.gatt.connect();
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        $scope.compatibilityError = err.toString();
      }
    }

  });
