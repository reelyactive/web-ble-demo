angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.device = JSON.stringify({}, null, ' ');
    $scope.scanCount = 0;

    function scan() {
      $scope.scanCount++;
      try {
        navigator.bluetooth.requestDevice({
          filters: [{
            services: [0xfed8]
            //name: 'reelyActive'
          }]
        })
        .then(device => { $scope.device = JSON.stringify(device, null, ' '); })
        .catch(error => { $scope.device = { error: error.toString() }; });
      }
      catch(err) {
        $scope.device = { err: err.toString() };
      }
    }

    $interval(scan, 4000);
  });
