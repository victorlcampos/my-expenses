{%= name %}Controllers.controller('HomeCtrl', ['$scope', 'Home', function ($scope, $cookieStore, Home) {
  $scope.helloWorld = function() {
    $scope.hello = "Hello World";
  }
}]);