var myExpensesApp  = angular.module('myExpensesApp', [
  'myExpensesRoutes',
  'myExpensesControllers',
  'myExpensesServices'
]);

var myExpensesRoutes      = angular.module('myExpensesRoutes'     , ['ngRoute'   ]);
var myExpensesControllers = angular.module('myExpensesControllers', []);
var myExpensesServices    = angular.module('myExpensesServices'   , ['ngResource']);

window.viewsPath        = "../../";
window.apiRemoteUrl     = "<%= apiRemoteUrl %>/";