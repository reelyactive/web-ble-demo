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
            //services: ['battery_service', 'heart_rate', 0xfed8, 0xfeed, 0xcbbfe0e1f7f3420684e084cbb3d09dfc]
          }]
            services: [0xcbbfe0e1f7f3420684e084cbb3d09dfc]
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
