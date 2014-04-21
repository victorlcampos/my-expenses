{%= name %}Controllers.$inject = ['$scope', 'Home'];
{%= name %}Controllers.controller('HomeCtrl', ['$scope', 'Home', function ($scope, Home) {
  $scope.helloWorld = function() {
    $scope.hello = "Hello World";
  }
}]);
