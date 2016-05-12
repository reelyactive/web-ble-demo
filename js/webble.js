angular.module('webble', [ 'ui.bootstrap' ])

  // Interaction controller
  .controller('InteractionCtrl', function($scope) {
    $scope.device = JSON.stringify({}, null, ' ');

    navigator.bluetooth.requestDevice({
      filters: [{
        name: 'reelyActive'
      }]
    })
    .then(device => { $scope.device = JSON.stringify(device, null, ' '); })
    .catch(error => { $scope.device = { error: error }; });
  });
