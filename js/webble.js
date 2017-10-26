angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope, $interval) {
    $scope.isChrome = !!window.chrome && !!window.chrome.webstore;
    $scope.compatibilityError = null;

    $scope.scan = function() {
      $scope.result = null;    // Clear any
      $scope.device = null;    //   previous
      $scope.event = null;     //   values or
      $scope.scanError = null; //   errors

      try {
        var deviceInfo = {};
        console.log('Starting to request BLE devices');
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true
        })
        .then(device => {
          deviceInfo.name = device.name;
          deviceInfo.id = device.id,
          $scope.device = JSON.stringify(deviceInfo, null, 2);
          console.log('User paired with device name:', device.name,
                      'id:', device.id);
        })
        .catch(error => { $scope.scanError = error.toString(); });
      }
      catch(err) {
        console.log('Unable to request BLE devices');
        $scope.compatibilityError = err.toString();
      }
    }

    // Hack to periodically apply scope so variables update in browser
    setInterval(function() { $scope.$apply(); }, 1000);
  });
